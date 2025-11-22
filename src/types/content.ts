/**
 * Content Type Definitions
 *
 * TypeScript interfaces for all content entities loaded from Markdown files
 * and used throughout the application.
 */

/**
 * Base frontmatter fields common to all content types
 */
export interface BaseFrontmatter {
  /**
   * Content title
   */
  title: string;

  /**
   * SEO description
   */
  description: string;

  /**
   * Publication date (ISO 8601 format)
   */
  date: string;
}

/**
 * Service Frontmatter
 *
 * Metadata for service pages (Legal or Tech)
 */
export interface ServiceFrontmatter {
  /**
   * Service title
   */
  title: string;

  /**
   * Service description
   */
  description: string;

  /**
   * Service category: legal or tech
   */
  category: "legal" | "tech";

  /**
   * Service icon identifier
   */
  icon: string;

  /**
   * Service price
   */
  price: string;

  /**
   * Display order
   */
  order: number;

  /**
   * SEO metadata
   */
  seo: {
    keywords: string;
    ogImage: string;
  };

  /**
   * Featured service flag
   */
  featured?: boolean;
}

/**
 * Complete Service object with content
 */
export interface Service {
  /**
   * URL slug derived from filename
   */
  slug: string;

  /**
   * Frontmatter metadata
   */
  frontmatter: ServiceFrontmatter;

  /**
   * Markdown content (raw)
   */
  content: string;

  /**
   * Rendered HTML content
   */
  html: string;
}

/**
 * Price Item
 *
 * Individual pricing entry for the Offer Catalog
 */
export interface PriceItem {
  /**
   * Unique identifier (kebab-case)
   */
  id: string;

  /**
   * High-level direction for filtering (legal | tech)
   */
  practice: "legal" | "tech";

  /**
   * Thematic category displayed to users (e.g., Арбитраж, CRM)
   */
  category: string;

  /**
   * Public title
   */
  title: string;

  /**
   * Short description of the deliverable
   */
  description: string;

  /**
   * Base price in rubles
   */
  price: number;

  /**
   * Whether the price is the starting point ("от")
   */
  priceFrom: boolean;

  /**
   * Unit of measurement (дело, проект, консультация, месяц)
   */
  unit: string;

  /**
   * Optional list of bullet features
   */
  features?: string[];

  /**
   * Highlight card in UI
   */
  featured?: boolean;
}

/**
 * Case Study Frontmatter
 *
 * Metadata for portfolio/case study pages
 */
export interface CaseStudyFrontmatter extends BaseFrontmatter {
  /**
   * Client name
   */
  client: string;

  /**
   * Service type / practice area
   */
  serviceType: "legal" | "tech";

  /**
   * Short description for cards/previews
   */
  shortDescription: string;

  /**
   * Key performance/result metrics
   */
  resultMetrics: string;

  /**
   * Cover image URL
   */
  image: string;

  /**
   * Technologies/methods used (Tech cases only)
   */
  technologies?: string[];
}

/**
 * Complete Case Study object with content
 */
export interface CaseStudy {
  /**
   * Case slug derived from filename
   */
  slug: string;

  /**
   * Frontmatter metadata
   */
  frontmatter: CaseStudyFrontmatter;

  /**
   * Markdown content (raw)
   */
  content: string;

  /**
   * Rendered HTML content
   */
  html?: string;
}

/**
 * Blog Post Frontmatter
 *
 * Metadata for blog articles
 */
export interface BlogPostFrontmatter extends BaseFrontmatter {
  /**
   * Post author
   */
  author: string;

  /**
   * Blog category (e.g., "Юридические советы", "IT-решения")
   */
  category: string;

  /**
   * SEO keywords string
   */
  keywords: string;

  /**
   * Short excerpt (used for previews/meta)
   */
  excerpt: string;

  /**
   * Cover image URL
   */
  image: string;

  /**
   * Related posts slugs
   */
  relatedPosts?: string[];

  /**
   * Estimated reading time in minutes
   */
  readingTime?: number;

  /**
   * Featured post flag
   */
  featured?: boolean;

  /**
   * Last updated date (ISO 8601 format)
   */
  updatedDate?: string;
}

/**
 * Complete Blog Post object with content
 */
export interface BlogPost {
  /**
   * URL slug for the post
   */
  slug: string;

  /**
   * Frontmatter metadata
   */
  frontmatter: BlogPostFrontmatter;

  /**
   * Markdown content (raw)
   */
  content: string;

  /**
   * Rendered HTML content
   */
  html?: string;
}

/**
 * Messenger Contact
 *
 * Contact information for various messaging platforms
 */
export interface MessengerContact {
  /**
   * Platform name (e.g., "telegram", "whatsapp", "email")
   */
  platform: "telegram" | "whatsapp" | "email" | "phone";

  /**
   * Display label
   */
  label: string;

  /**
   * Contact value (username, phone, email)
   */
  value: string;

  /**
   * Full contact URL/link
   */
  url: string;

  /**
   * Platform icon identifier
   */
  icon?: string;

  /**
   * Primary contact method flag
   */
  primary?: boolean;
}

/**
 * Team Member
 *
 * Information about team members (for future expansion)
 */
export interface TeamMember {
  /**
   * Member name
   */
  name: string;

  /**
   * Position/role
   */
  position: string;

  /**
   * Department: legal or tech
   */
  department: "legal" | "tech";

  /**
   * Profile photo URL
   */
  photo: string;

  /**
   * Short bio
   */
  bio: string;

  /**
   * Email address
   */
  email?: string;

  /**
   * Social media links
   */
  socials?: {
    linkedin?: string;
    telegram?: string;
  };
}

/**
 * Navigation Item
 *
 * Structure for navigation menu items
 */
export interface NavigationItem {
  /**
   * Display label
   */
  label: string;

  /**
   * Link URL
   */
  href: string;

  /**
   * Navigation category
   */
  category?: "legal" | "tech" | "general";

  /**
   * Nested menu items
   */
  children?: NavigationItem[];

  /**
   * External link flag
   */
  external?: boolean;
}
