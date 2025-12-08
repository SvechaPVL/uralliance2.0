import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/primitives/button";
import { Home, ArrowLeft, Phone, MessageCircle } from "lucide-react";
import { contacts, getWhatsAppLink } from "@/lib/contacts";

export const metadata: Metadata = {
  title: "404 - Страница не найдена | Uralliance",
  description: "Запрашиваемая страница не существует. Вернитесь на главную или свяжитесь с нами.",
  robots: "noindex, nofollow",
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 py-16">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Legal gradient blob */}
        <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-[var(--color-legal-primary)]/10 blur-3xl" />
        {/* Tech gradient blob */}
        <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-[var(--color-tech-primary)]/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        {/* 404 Number */}
        <div className="relative mb-8">
          <span className="text-[10rem] leading-none font-bold tracking-tighter sm:text-[14rem]">
            <span className="bg-gradient-to-r from-[var(--color-legal-primary)] via-[var(--color-legal-400)] to-[var(--color-tech-primary)] bg-clip-text text-transparent">
              4
            </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-br from-[var(--color-legal-primary)]/20 to-[var(--color-tech-primary)]/20 bg-clip-text text-transparent">
                0
              </span>
              {/* Animated ring around zero */}
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="h-24 w-24 animate-pulse rounded-full border-4 border-dashed border-[var(--color-legal-primary)]/30 sm:h-32 sm:w-32" />
              </span>
            </span>
            <span className="bg-gradient-to-r from-[var(--color-tech-primary)] via-[var(--color-tech-400)] to-[var(--color-legal-primary)] bg-clip-text text-transparent">
              4
            </span>
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
          Страница не найдена
        </h1>

        {/* Description */}
        <p className="mb-8 max-w-md text-[var(--color-text-secondary)]">
          Возможно, страница была перемещена или удалена. Проверьте адрес или вернитесь на главную.
        </p>

        {/* Action buttons */}
        <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button asChild variant="primary-legal" size="lg" className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              На главную
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="javascript:history.back()">
              <ArrowLeft className="h-4 w-4" />
              Назад
            </Link>
          </Button>
        </div>

        {/* Divider */}
        <div className="mb-8 flex w-full items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
          <span className="text-sm text-[var(--color-text-muted)]">или свяжитесь с нами</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
        </div>

        {/* Contact options */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={contacts.phone.main.link}
            className="flex items-center gap-2 rounded-full border border-[var(--color-legal-primary)]/30 bg-[var(--color-legal-primary)]/10 px-5 py-2.5 text-sm font-medium text-[var(--color-legal-primary)] transition-all hover:border-[var(--color-legal-primary)]/50 hover:bg-[var(--color-legal-primary)]/20"
          >
            <Phone className="h-4 w-4" />
            {contacts.phone.main.display}
          </a>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-5 py-2.5 text-sm font-medium text-[#25D366] transition-all hover:border-[#25D366]/50 hover:bg-[#25D366]/20"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>

        {/* Popular links */}
        <div className="mt-12">
          <p className="mb-4 text-sm text-[var(--color-text-muted)]">Популярные разделы:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { href: "/services/legal", label: "Юридические услуги" },
              { href: "/services/tech", label: "IT-решения" },
              { href: "/contact", label: "Контакты" },
              { href: "/about", label: "О компании" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/50 px-3 py-1.5 text-sm text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-legal-primary)]/30 hover:bg-[var(--color-legal-surface)]/50 hover:text-[var(--color-text-primary)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
