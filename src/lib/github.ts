import { Octokit } from '@octokit/rest';
import { graphql } from '@octokit/graphql';

const username = 'Naeem1144';

const githubToken = process.env.GITHUB_TOKEN;

// Lazy initialization of Octokit clients
let publicOctokit: Octokit | null = null;
let authenticatedOctokit: Octokit | null = null;
let graphqlWithAuth: typeof graphql | null = null;

function getPublicOctokit(): Octokit {
  if (!publicOctokit) {
    publicOctokit = new Octokit();
  }
  return publicOctokit;
}

function getAuthenticatedOctokit(): Octokit | null {
  if (!githubToken) return null;
  if (!authenticatedOctokit) {
    authenticatedOctokit = new Octokit({
      auth: githubToken,
    });
  }
  return authenticatedOctokit;
}

function getGraphqlWithAuth(): typeof graphql | null {
  if (!githubToken) return null;
  if (!graphqlWithAuth) {
    graphqlWithAuth = graphql.defaults({
      headers: {
        authorization: `Bearer ${githubToken}`,
      },
    });
  }
  return graphqlWithAuth;
}

const EXCLUDED_REPOS = ['portfolio-site', 'Naeem1144'];

function isRepoExcluded(name: string) {
  return EXCLUDED_REPOS.some(repo => repo.toLowerCase() === name.toLowerCase());
}

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

// Helper function to handle auth retry logic
async function withAuthRetry<T>(
  authenticatedFn: () => Promise<T>,
  publicFn: () => Promise<T>,
  errorContext: string
): Promise<T | null> {
  const authClient = getAuthenticatedOctokit();
  
  try {
    return await (authClient ? authenticatedFn() : publicFn());
  } catch (error: unknown) {
    const errorWithStatus = error as { status?: number };
    if ((errorWithStatus?.status === 401 || errorWithStatus?.status === 403) && authClient) {
      console.warn(`${errorContext} failed with provided token. Retrying without authentication.`);
      
      try {
        return await publicFn();
      } catch (publicError) {
        console.error(`${errorContext} without authentication:`, publicError);
        return null;
      }
    }
    
    console.error(`${errorContext}:`, error);
    return null;
  }
}

// Function to fetch user profile data
export async function fetchGitHubProfile(): Promise<GitHubProfile | null> {
  return withAuthRetry(
    async () => {
      const client = getAuthenticatedOctokit()!;
      const { data } = await client.users.getByUsername({ username });
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
    },
    async () => {
      const client = getPublicOctokit();
      const { data } = await client.users.getByUsername({ username });
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
    },
    'Error fetching GitHub profile'
  );
}

async function fetchFallbackRepos() {
  const processRepos = (data: Awaited<ReturnType<Octokit['repos']['listForUser']>>['data']) => {
    const topRepos = data
      .filter(repo => !repo.fork)
      .filter(repo => !isRepoExcluded(repo.name))
      .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0))
      .slice(0, 6);

    return topRepos.map(repo => ({
      name: repo.name,
      description: repo.description || '',
      htmlUrl: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      homepage: repo.homepage || '',
      topics: repo.topics ?? [],
    }));
  };

  const result = await withAuthRetry(
    async () => {
      const client = getAuthenticatedOctokit()!;
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
    },
    async () => {
      const client = getPublicOctokit();
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
    },
    'Error fetching fallback GitHub repos'
  );

  return result ?? [];
}

// Function to fetch pinned repositories using GraphQL when possible, otherwise fall back
export async function fetchPinnedRepos() {
  const graphqlClient = getGraphqlWithAuth();
  
  if (!graphqlClient) {
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

    const response = await graphqlClient<GraphQLResponse>(query);
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
