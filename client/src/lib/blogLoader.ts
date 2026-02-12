export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: number;
  author: string;
  imageUrl: string;
}

function parseFrontmatter(raw: string): { frontmatter: Record<string, string | number>; body: string } {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, body: raw };
  }

  const frontmatterStr = match[1];
  const body = match[2].trim();
  const frontmatter: Record<string, string | number> = {};

  for (const line of frontmatterStr.split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let value: string | number = line.slice(colonIndex + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (key === 'readTime') {
      value = parseInt(value as string, 10);
    }
    frontmatter[key] = value;
  }

  return { frontmatter, body };
}

const markdownFiles = import.meta.glob('../../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export function loadBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = [];
  let index = 0;

  for (const [path, raw] of Object.entries(markdownFiles)) {
    const { frontmatter, body } = parseFrontmatter(raw as string);
    const filename = path.split('/').pop()?.replace('.md', '') || '';

    posts.push({
      id: String(index + 1),
      slug: (frontmatter.slug as string) || filename,
      title: (frontmatter.title as string) || '',
      excerpt: (frontmatter.excerpt as string) || '',
      content: body,
      category: (frontmatter.category as string) || '',
      date: (frontmatter.date as string) || '',
      readTime: (frontmatter.readTime as number) || 5,
      author: (frontmatter.author as string) || 'Sanjeev Batchali',
      imageUrl: (frontmatter.imageUrl as string) || '',
    });

    index++;
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const blogPosts = loadBlogPosts();
