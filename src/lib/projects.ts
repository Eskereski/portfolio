/**
 * Local metadata for projects fetched from GitHub.
 * Each entry maps to a GitHub repository by `repoName` and enriches the data
 * with custom `description`, `image`, `tags`, and `featured` flag.
 *
 * The route handler (GET /api/projects) merges this metadata with GitHub API data
 * (stars, language, url, updatedAt) to produce the final project objects.
 */

export interface ProjectMetadata {
  repoName: string;
  image: string | null;
  tags: string[];
  description: string;
  featured: boolean;
}

export const projectsMetadata: ProjectMetadata[] = [
  {
    repoName: 'portfolio',
    image: '/images/projects/portfolio.png',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    description: '',
    featured: true,
  }
];

/**
 * generateDefaultMetadata
 *
 * Creates a default metadata entry for a repository that doesn't have custom metadata.
 * Uses the GitHub language as a tag and generates a readable description from the repo name.
 */
export function generateDefaultMetadata(
  repoName: string,
  githubLanguage: string | null
): Omit<ProjectMetadata, 'repoName'> {
  const tags = githubLanguage ? [githubLanguage] : [];
  
  // Convert repo name (kebab-case or with numbers) to readable description
  const readableName = repoName
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    image: null,
    tags,
    description: '',
    featured: false,
  };
}