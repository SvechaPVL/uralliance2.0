import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import type { BlogPost, CaseStudy, Service } from "@/types/content";

const ROOT_DIR = process.cwd();
const CASES_DIR = path.join(ROOT_DIR, "content/cases");
const BLOG_DIR = path.join(ROOT_DIR, "content/blog");
const SERVICES_DIR = path.join(ROOT_DIR, "content/services");

interface MarkdownOptions {
  highlight?: boolean;
}

/**
 * Read markdown file and convert it to HTML
 */
async function parseMarkdownFile(filePath: string, options?: MarkdownOptions) {
  const fileContent = await fs.readFile(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const processor = remark().use(remarkRehype).use(rehypeSlug);

  if (options?.highlight) {
    processor.use(rehypeHighlight, { ignoreMissing: true });
  }

  processor.use(rehypeStringify);

  const processedContent = await processor.process(content);
  const htmlContent = processedContent.toString();

  return {
    data,
    content,
    htmlContent,
  };
}

async function listMarkdownFiles(directory: string) {
  try {
    return (await fs.readdir(directory)).filter((file) => file.endsWith(".md"));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

/**
 * Get case study by slug (filename)
 */
export async function getCaseBySlug(slug: string): Promise<CaseStudy> {
  const filePath = path.join(CASES_DIR, `${slug}.md`);
  const { data, content, htmlContent } = await parseMarkdownFile(filePath);

  return {
    slug,
    frontmatter: data as CaseStudy["frontmatter"],
    content,
    html: htmlContent,
  };
}

/**
 * Get all case studies sorted by date (newest first)
 */
export async function getAllCases(): Promise<CaseStudy[]> {
  const caseFiles = await listMarkdownFiles(CASES_DIR);
  const cases = await Promise.all(caseFiles.map(async (file) => getCaseBySlug(file.replace(/\.md$/, ""))));

  return cases.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

/**
 * Filter cases by service type (legal / tech)
 */
export async function getCasesByServiceType(serviceType: "legal" | "tech") {
  const cases = await getAllCases();
  return cases.filter((caseStudy) => caseStudy.frontmatter.serviceType === serviceType);
}

/**
 * Get blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  const { data, content, htmlContent } = await parseMarkdownFile(filePath, { highlight: true });

  return {
    slug,
    frontmatter: data as BlogPost["frontmatter"],
    content,
    html: htmlContent,
  };
}

/**
 * Get all blog posts sorted by date (newest first)
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const blogFiles = await listMarkdownFiles(BLOG_DIR);
  const posts = await Promise.all(blogFiles.map(async (file) => getBlogPostBySlug(file.replace(/\.md$/, ""))));

  return posts.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

/**
 * Get blog posts by category
 */
export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter((post) => post.frontmatter.category === category);
}

/**
 * Get related posts by slug list
 */
export async function getRelatedPosts(slugs: string[] = []): Promise<BlogPost[]> {
  if (!slugs.length) {
    return [];
  }

  return Promise.all(slugs.map((slug) => getBlogPostBySlug(slug)));
}

// =============================================================================
// SERVICES
// =============================================================================

/**
 * Get service by category and slug
 */
export async function getServiceBySlug(
  category: "legal" | "tech",
  slug: string
): Promise<Service> {
  const categoryDir = path.join(SERVICES_DIR, category);
  const filePath = path.join(categoryDir, `${slug}.md`);
  const { data, content, htmlContent } = await parseMarkdownFile(filePath);

  return {
    slug,
    frontmatter: data as Service["frontmatter"],
    content,
    html: htmlContent,
  };
}

/**
 * Get all services by category sorted by order
 */
export async function getServicesByCategory(
  category: "legal" | "tech"
): Promise<Service[]> {
  const categoryDir = path.join(SERVICES_DIR, category);
  const serviceFiles = await listMarkdownFiles(categoryDir);

  const services = await Promise.all(
    serviceFiles.map(async (file) =>
      getServiceBySlug(category, file.replace(/\.md$/, ""))
    )
  );

  return services.sort(
    (a, b) => a.frontmatter.order - b.frontmatter.order
  );
}

/**
 * Get all service slugs for static generation
 */
export async function getAllServiceSlugs(): Promise<
  Array<{ category: "legal" | "tech"; slug: string }>
> {
  const categories: Array<"legal" | "tech"> = ["legal", "tech"];
  const slugs: Array<{ category: "legal" | "tech"; slug: string }> = [];

  for (const category of categories) {
    const categoryDir = path.join(SERVICES_DIR, category);
    const files = await listMarkdownFiles(categoryDir);

    for (const file of files) {
      slugs.push({
        category,
        slug: file.replace(/\.md$/, ""),
      });
    }
  }

  return slugs;
}

/**
 * Get all services (both legal and tech)
 */
export async function getAllServices(): Promise<Service[]> {
  const legal = await getServicesByCategory("legal");
  const tech = await getServicesByCategory("tech");

  return [...legal, ...tech];
}
