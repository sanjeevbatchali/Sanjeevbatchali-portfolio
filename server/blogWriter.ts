import fs from "fs";
import path from "path";

export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  category: "Finance" | "Career" | "Technology" | "Consulting";
  excerpt: string;
  readTime: number;
  author: string;
  imageUrl: string;
  body: string;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getTodayDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function estimateReadTime(body: string): number {
  const wordCount = body.split(/\s+/).length;
  return Math.max(1, Math.round(wordCount / 200));
}

export function createMarkdownContent(post: BlogPost): string {
  const frontmatter = [
    "---",
    `title: "${post.title.replace(/"/g, '\\"')}"`,
    `slug: "${post.slug}"`,
    `date: "${post.date}"`,
    `category: "${post.category}"`,
    `excerpt: "${post.excerpt.replace(/"/g, '\\"')}"`,
    `readTime: ${post.readTime}`,
    `author: "${post.author}"`,
    `imageUrl: "${post.imageUrl}"`,
    "---",
    "",
  ].join("\n");

  return frontmatter + post.body;
}

export function saveBlogPost(post: BlogPost): string {
  const blogDir = path.resolve(process.cwd(), "client/content/blog");

  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }

  const filename = `${post.slug}.md`;
  const filePath = path.join(blogDir, filename);
  const content = createMarkdownContent(post);

  fs.writeFileSync(filePath, content, "utf-8");
  return filePath;
}

export function buildBlogPost(
  title: string,
  category: BlogPost["category"],
  excerpt: string,
  body: string,
  imageUrl: string
): BlogPost {
  return {
    title,
    slug: generateSlug(title),
    date: getTodayDate(),
    category,
    excerpt,
    readTime: estimateReadTime(body),
    author: "Sanjeev Batchali",
    imageUrl,
    body,
  };
}
