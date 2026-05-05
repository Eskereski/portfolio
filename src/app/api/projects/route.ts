import { NextResponse } from 'next/server';
import { projectsMetadata, generateDefaultMetadata } from '../../../lib/projects';

const GITHUB_API = 'https://api.github.com';

type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
};

type EnrichedProject = {
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

async function fetchGitHubRepos(username: string, token?: string): Promise<Repo[]> {
  const url = `${GITHUB_API}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`;
  const headers: Record<string,string> = {
    'Accept': 'application/vnd.github+json'
  };
  if (token) headers['Authorization'] = `token ${token}`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return (await res.json()) as Repo[];
}

function enrich(repos: Repo[], metadata: typeof projectsMetadata): EnrichedProject[] {
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

export async function GET() {
  try {
    const username = process.env.GITHUB_USERNAME ?? 'Eskereski';
    const token = process.env.GITHUB_TOKEN;
    const repos = await fetchGitHubRepos(username, token);
    const projects = enrich(repos, projectsMetadata || []);
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error: any) {
    console.error('GET /api/projects error', error);
    return NextResponse.json({ error: error.message ?? 'unknown' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const secret = url.searchParams.get('secret') ?? '';
    const githubSignature = req.headers.get('x-hub-signature-256');
    const envSecret = process.env.REVALIDATION_SECRET ?? process.env.REVALIDATION_TOKEN ?? '';

    if (githubSignature) {
      if (!envSecret) {
        return NextResponse.json({ error: 'Server misconfigured: missing REVALIDATION secret' }, { status: 500 });
      }
      const body = await req.text();
      const hmac = crypto.createHmac('sha256', envSecret).update(body).digest('hex');
      const expected = `sha256=${hmac}`;
      const sigBuffer = Buffer.from(githubSignature, 'utf8');
      const expBuffer = Buffer.from(expected, 'utf8');
      if (sigBuffer.length !== expBuffer.length || !crypto.timingSafeEqual(sigBuffer, expBuffer)) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    } else {
      if (!envSecret || secret !== envSecret) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    return NextResponse.json({ revalidated: true }, { status: 200 });
  } catch (error: any) {
    console.error('POST /api/projects error', error);
    return NextResponse.json({ error: error.message ?? 'unknown' }, { status: 500 });
  }
}
import crypto from 'crypto';