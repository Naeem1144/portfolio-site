import { Octokit } from '@octokit/rest';
import { graphql } from '@octokit/graphql';

const username = 'Naeem1144';

const githubToken = process.env.GITHUB_TOKEN;

const publicOctokit = new Octokit();
const authenticatedOctokit = githubToken
  ? new Octokit({
      auth: githubToken,
    })
  : null;

const EXCLUDED_REPOS = ['portfolio-site', 'Naeem1144'];

function isRepoExcluded(name: string) {
  return EXCLUDED_REPOS.some(repo => repo.toLowerCase() === name.toLowerCase());
}

// Lazily create GraphQL client only when a token is configured
const graphqlWithAuth = githubToken
  ? graphql.defaults({
      headers: {
        authorization: `Bearer ${githubToken}`,
      },
    })
  : null;

interface GitHubProfile {
  name: string;
  bio: string;
  avatarUrl: string;
  followers: number;
  following: number;
  location: string;
  company: string;
  blog: string;
  twitterUsername: string;
  publicRepos: number;
  htmlUrl: string;
}

interface Repository {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
  } | null;
  homepageUrl: string | null;
  repositoryTopics: {
    nodes: Array<{
      topic: {
        name: string;
      };
    }>;
  };
}

interface GraphQLResponse {
  user: {
    pinnedItems: {
      nodes: Repository[];
    };
  };
}

// Helper function to fetch user data with a specific client
async function fetchUserData(client: Octokit) {
  const { data } = await client.users.getByUsername({
    username,
  });

  return {
    name: data.name || username,
    bio: data.bio || '',
    avatarUrl: data.avatar_url,
    followers: data.followers,
    following: data.following,
    location: data.location || '',
    company: data.company || '',
    blog: data.blog || '',
    twitterUsername: data.twitter_username || '',
    publicRepos: data.public_repos,
    htmlUrl: data.html_url,
  };
}

// Function to fetch user profile data with caching
// Cache revalidates every 1 hour (3600 seconds)
export async function fetchGitHubProfile(): Promise<GitHubProfile | null> {
  const client = authenticatedOctokit ?? publicOctokit;

  try {
    return await fetchUserData(client);
  } catch (error: unknown) {
    const errorWithStatus = error as { status?: number };
    if ((errorWithStatus?.status === 401 || errorWithStatus?.status === 403) && authenticatedOctokit) {
      console.warn('GitHub profile request failed with provided token. Retrying without authentication.');

      try {
        return await fetchUserData(publicOctokit);
      } catch (publicError) {
        console.error('Error fetching GitHub profile without authentication:', publicError);
        return null;
      }
    }

    console.error('Error fetching GitHub profile:', error);
    return null;
  }
}

interface RepoData {
  fork: boolean;
  name: string;
  stargazers_count: number;
  description: string | null;
  html_url: string;
  forks_count: number;
  language: string | null;
  homepage: string | null;
  topics: string[];
}

// Helper function to process and format repository data
function processRepos(repos: RepoData[]) {
  // Filter first for better readability and performance on typical repo counts
  return repos
    .filter(repo => !repo.fork && !isRepoExcluded(repo.name))
    .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0))
    .slice(0, 6)
    .map(repo => ({
      name: repo.name,
      description: repo.description || '',
      htmlUrl: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      homepage: repo.homepage || '',
      topics: repo.topics ?? [],
    }));
}

// Helper function to fetch repos with a specific client
async function fetchReposData(client: Octokit) {
  const { data } = await client.repos.listForUser({
    username,
    type: 'owner',
    per_page: 100,
    sort: 'updated',
    mediaType: {
      previews: ['mercy'],
    },
  });
  return processRepos(data);
}

async function fetchFallbackRepos() {
  const client = authenticatedOctokit ?? publicOctokit;

  try {
    return await fetchReposData(client);
  } catch (error: unknown) {
    const errorWithStatus = error as { status?: number };
    if ((errorWithStatus?.status === 401 || errorWithStatus?.status === 403) && authenticatedOctokit) {
      console.warn('GitHub REST API returned an authorization error. Retrying without authentication.');

      try {
        return await fetchReposData(publicOctokit);
      } catch (publicError) {
        console.error('Error fetching fallback GitHub repos without authentication:', publicError);
        return [];
      }
    }

    console.error('Error fetching fallback GitHub repos:', error);
    return [];
  }
}

// Function to fetch pinned repositories using GraphQL when possible, otherwise fall back
export async function fetchPinnedRepos() {
  if (!graphqlWithAuth) {
    console.warn('GITHUB_TOKEN is not configured. Falling back to public repository data.');
    return fetchFallbackRepos();
  }

  try {
    const query = `
      query {
        user(login: "${username}") {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                url
                stargazerCount
                forkCount
                primaryLanguage {
                  name
                }
                homepageUrl
                repositoryTopics(first: 10) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await graphqlWithAuth<GraphQLResponse>(query);
    const pinnedRepos = response.user.pinnedItems.nodes;

    return pinnedRepos
      .filter(repo => !isRepoExcluded(repo.name))
      .map(repo => ({
        name: repo.name,
        description: repo.description || '',
        htmlUrl: repo.url,
        stars: repo.stargazerCount,
        forks: repo.forkCount,
        language: repo.primaryLanguage?.name || null,
        homepage: repo.homepageUrl || '',
        topics: repo.repositoryTopics.nodes.map(topic => topic.topic.name),
      }));
  } catch (error: unknown) {
    const errorWithStatus = error as { status?: number };
    if (errorWithStatus?.status === 401 || errorWithStatus?.status === 403) {
      console.warn('GitHub GraphQL returned an authorization error. Falling back to public repository data.');
      return fetchFallbackRepos();
    }

    console.error('Error fetching pinned GitHub repos:', error);
    return [];
  }
}
