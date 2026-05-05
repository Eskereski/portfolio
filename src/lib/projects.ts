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
    image: '/images/portfolio.png',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    description:
      'Meu portfolio pessoal desenvolvido com Next.js 16, TypeScript, Tailwind CSS e integrações com GitHub API. Apresenta projetos dinâmicos e metadados enriquecidos.',
    featured: true,
  },
  {
    repoName: 'awesome-project',
    image: '/images/awesome-project.png',
    tags: ['TypeScript', 'Node.js', 'Express', 'MongoDB'],
    description:
      'Um projeto incrível que demonstra padrões modernos de backend e tratamento de erros robusto.',
    featured: true,
  },
  {
    repoName: 'learning-react',
    image: null,
    tags: ['React', 'JavaScript', 'Educação'],
    description:
      'Repositório de estudo e experimentação com React hooks, context API e padrões avançados.',
    featured: false,
  },
  {
    repoName: 'cli-tool',
    image: null,
    tags: ['CLI', 'Node.js', 'Utilities'],
    description:
      'Ferramenta de linha de comando para automação de tarefas comuns de desenvolvimento.',
    featured: false,
  },
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
    description: `Repositório: ${readableName}. Adicione uma descrição customizada em projectsMetadata para mais detalhes.`,
    featured: false,
  };
}