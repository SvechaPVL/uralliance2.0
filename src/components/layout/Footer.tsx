import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { generateWhatsAppLink, generateTelegramLink } from "@/lib/messenger";

/**
 * Footer Link Interface
 */
interface FooterLink {
  label: string;
  href: string;
}

/**
 * Footer Column Interface
 */
interface FooterColumn {
  title: string;
  links: FooterLink[];
  category?: "legal" | "tech" | "company";
}

/**
 * Footer Columns Configuration
 */
const footerColumns: FooterColumn[] = [
  {
    title: "Юридические услуги",
    category: "legal",
    links: [
      { label: "Корпоративное право", href: "/services/legal/corporate" },
      { label: "Договорное право", href: "/services/legal/contracts" },
      { label: "Интеллектуальная собственность", href: "/services/legal/ip" },
      { label: "Судебная защита", href: "/services/legal/litigation" },
    ],
  },
  {
    title: "IT-решения",
    category: "tech",
    links: [
      { label: "Разработка сайтов", href: "/services/tech/web" },
      { label: "Мобильные приложения", href: "/services/tech/mobile" },
      { label: "Telegram боты", href: "/services/tech/bots" },
      { label: "CRM интеграции", href: "/services/tech/integrations" },
    ],
  },
  {
    title: "Компания",
    category: "company",
    links: [
      { label: "О нас", href: "/about" },
      { label: "Кейсы", href: "/cases" },
      { label: "Блог", href: "/blog" },
      { label: "Контакты", href: "/contact" },
    ],
  },
];

/**
 * Generate social/messenger links with pre-filled messages
 */
const getSocialLinks = () => [
  {
    name: "Telegram",
    href: generateTelegramLink(),
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: generateWhatsAppLink(),
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:info@uralliance.ru",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

/**
 * Footer Component
 *
 * Main site footer with navigation links, contact information, and social links
 * Implements dual brand identity with Legal/Tech categorization
 *
 * Features:
 * - Three-column navigation (Legal, Tech, Company)
 * - Social/messenger links (Telegram, WhatsApp, Email)
 * - Copyright notice
 * - Responsive design (stacks on mobile)
 * - Accessible links with proper ARIA labels
 */
export function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = getSocialLinks();

  return (
    <footer className="bg-[var(--color-background-secondary)] border-t border-[var(--color-border)] select-none">
      <Container size="2xl" className="py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <div
                className={cn(
                  "font-display font-bold text-2xl",
                  "bg-gradient-to-r from-[var(--color-legal-primary)] to-[var(--color-tech-primary)]",
                  "bg-clip-text text-transparent"
                )}
              >
                Uralliance
              </div>
            </Link>
            <p className="text-[var(--color-text-secondary)] text-sm mb-6">
              Premium корпоративный сайт — объединяем Legal и Tech для успеха вашего бизнеса
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "text-[var(--color-text-muted)]",
                    "hover:text-[var(--color-tech-primary)]",
                    "transition-colors duration-[var(--transition-base)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-tech-primary)] rounded-lg p-1"
                  )}
                  aria-label={`${social.name} link`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3
                className={cn(
                  "font-display font-semibold text-lg mb-4",
                  column.category === "legal" && "text-[var(--color-legal-dark)]",
                  column.category === "tech" && "text-[var(--color-tech-dark)]",
                  column.category === "company" && "text-[var(--color-text-primary)]"
                )}
              >
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-[var(--color-text-secondary)] text-sm",
                        "hover:text-[var(--color-text-primary)]",
                        column.category === "legal" &&
                          "hover:text-[var(--color-legal-primary)]",
                        column.category === "tech" && "hover:text-[var(--color-tech-primary)]",
                        "transition-colors duration-[var(--transition-base)]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-legal-primary)] rounded-sm"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[var(--color-text-muted)] text-sm">
              © {currentYear} Uralliance. Все права защищены.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className={cn(
                  "text-[var(--color-text-muted)] text-sm",
                  "hover:text-[var(--color-text-primary)]",
                  "transition-colors duration-[var(--transition-base)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-legal-primary)] rounded-sm"
                )}
              >
                Политика конфиденциальности
              </Link>
              <Link
                href="/terms"
                className={cn(
                  "text-[var(--color-text-muted)] text-sm",
                  "hover:text-[var(--color-text-primary)]",
                  "transition-colors duration-[var(--transition-base)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-legal-primary)] rounded-sm"
                )}
              >
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
