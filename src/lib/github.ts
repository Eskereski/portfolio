import { projectsMetadata, generateDefaultMetadata } from './projects';

const GITHUB_API = 'https://api.github.com';

export type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
};

export type EnrichedProject = {
  repoName: string;
  name: string;
  url: string;
  description: string;
  image: string | null;
  tags: string[];
  featured: boolean;
  stars: number;
  language: string | null;
  updatedAt: string;
};

export async function fetchGitHubRepos(username: string, token?: string): Promise<Repo[]> {
  const url = `${GITHUB_API}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`;
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github+json'
  };
  
  // Correção de padrão de token: Fine-grained PATs utilizam Bearer
  if (token) headers['Authorization'] = `Bearer ${token}`;
  
  const res = await fetch(url, { headers });
  
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }
  return (await res.json()) as Repo[];
}

export function enrich(repos: Repo[], metadata: typeof projectsMetadata): EnrichedProject[] {
  return repos.map(repo => {
    const meta = metadata.find(m => m.repoName === repo.name);
    const fallback = generateDefaultMetadata(repo.name, repo.language);
    return {
      repoName: repo.name,
      name: repo.name,
      url: repo.html_url,
      description: meta?.description ?? fallback.description,
      image: meta?.image ?? fallback.image,
      tags: (meta?.tags && meta.tags.length > 0) ? meta.tags : fallback.tags,
      featured: meta?.featured ?? fallback.featured,
      stars: repo.stargazers_count ?? 0,
      language: repo.language ?? null,
      updatedAt: repo.updated_at,
    };
  }).sort((a,b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
}

export async function getProjectsData() {
  const username = process.env.GITHUB_USERNAME ?? 'Eskereski';
  const token = process.env.GITHUB_TOKEN;
  const repos = await fetchGitHubRepos(username, token);
  return enrich(repos, projectsMetadata || []);
}
