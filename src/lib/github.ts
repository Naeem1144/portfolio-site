import { Octokit } from '@octokit/rest';
import { graphql } from '@octokit/graphql';

const username = 'Naeem1144';

// Initialize Octokit with authentication
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

// Initialize GraphQL client with authentication
const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});

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

// Function to fetch user profile data
export async function fetchGitHubProfile(): Promise<GitHubProfile | null> {
  try {
    const { data } = await octokit.users.getByUsername({
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
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    return null;
  }
}

// Function to fetch pinned repositories using GraphQL
export async function fetchPinnedRepos() {
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

    return pinnedRepos.map((repo: Repository) => ({
      name: repo.name,
      description: repo.description || '',
      htmlUrl: repo.url,
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      language: repo.primaryLanguage?.name,
      homepage: repo.homepageUrl || '',
      topics: repo.repositoryTopics.nodes.map(topic => topic.topic.name),
    }));
  } catch (error) {
    console.error('Error fetching pinned GitHub repos:', error);
    return [];
  }
}
