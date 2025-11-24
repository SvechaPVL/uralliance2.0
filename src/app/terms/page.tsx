import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/primitives/section";

export const metadata: Metadata = {
  title: "Условия использования | Uralliance",
  description:
    "Условия использования сайта ООО 'Юральянс'. Правила и условия предоставления юридических и IT-услуг.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-28 pb-20">
      <Container>
        <Section>
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-8 text-4xl font-bold text-[var(--color-text-primary)] md:text-5xl">
              Условия использования
            </h1>

            <div className="prose prose-invert max-w-none">
              <p className="mb-6 text-lg text-[var(--color-text-secondary)]">
                Дата последнего обновления: {new Date().toLocaleDateString("ru-RU")}
              </p>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-[var(--color-text-primary)]">
                  1. Общие условия
                </h2>
                <p className="mb-4 text-[var(--color-text-secondary)]">
                  Настоящие Условия использования (далее — Условия) регулируют отношения между ООО
                  &quot;Юральянс&quot; (ИНН 2536133736, ОГРН 1032501291591) и пользователями сайта
                  uralliance.ru.
                </p>
                <p className="text-[var(--color-text-secondary)]">
                  Используя сайт, вы соглашаетесь с настоящими Условиями. Если вы не согласны с
                  какими-либо из этих условий, пожалуйста, не используйте наш сайт.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-[var(--color-text-primary)]">
                  2. Предоставление услуг
                </h2>
                <p className="mb-4 text-[var(--color-text-secondary)]">
                  ООО &quot;Юральянс&quot; предоставляет следующие виды услуг:
                </p>
                <ul className="mb-4 list-inside list-disc space-y-2 text-[var(--color-text-secondary)]">
                  <li>
                    Юридические услуги (консультации, представительство в судах, сопровождение
                    сделок)
                  </li>
                  <li>IT-решения (разработка сайтов, мобильных приложений, чат-ботов)</li>
                  <li>Интеграция с учетными системами (1С, CRM)</li>
                  <li>
                    Дополнительные услуги (электронные подписи, экспертизы, юридические адреса)
                  </li>
                </ul>
                <p className="text-[var(--color-text-secondary)]">
                  Конкретные условия оказания услуг определяются в индивидуальном договоре с
                  клиентом.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-[var(--color-text-primary)]">
                  3. Интеллектуальная собственность
                </h2>
                <p className="mb-4 text-[var(--color-text-secondary)]">
                  Все материалы сайта (тексты, изображения, дизайн, логотипы) являются объектами
                  интеллектуальной собственности ООО &quot;Юральянс&quot; и защищены
                  законодательством РФ.
                </p>
                <p className="text-[var(--color-text-secondary)]">
                  Использование материалов сайта без письменного разрешения запрещено.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-[var(--color-text-primary)]">
                  4. Ограничение ответственности
                </h2>
                <p className="mb-4 text-[var(--color-text-secondary)]">
                  Информация на сайте носит справочный характер и не является публичной офертой.
                  Окончательные условия и стоимость услуг определяются индивидуально.
                </p>
                <p className="text-[var(--color-text-secondary)]">
                  ООО &quot;Юральянс&quot; не несет ответственности за решения, принятые на основе
                  информации, размещенной на сайте, без заключения договора на оказание услуг.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-[var(--color-text-primary)]">
                  5. Изменение условий
                </h2>
                <p className="mb-4 text-[var(--color-text-secondary)]">
                  Компания оставляет за собой право вносить изменения в настоящие Условия. Изменения
                  вступают в силу с момента публикации на сайте.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-[var(--color-text-primary)]">
                  6. Контактная информация
                </h2>
                <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card-bg)] p-6">
                  <p className="mb-4 font-semibold text-[var(--color-text-primary)]">
                    ООО &quot;Юральянс&quot;
                  </p>
                  <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                    <div>
                      <p className="mb-1 text-[var(--color-text-muted)]">ИНН</p>
                      <p className="text-[var(--color-text-secondary)]">2536133736</p>
                    </div>
                    <div>
                      <p className="mb-1 text-[var(--color-text-muted)]">ОГРН</p>
                      <p className="text-[var(--color-text-secondary)]">1032501291591</p>
                    </div>
                    <div>
                      <p className="mb-1 text-[var(--color-text-muted)]">КПП</p>
                      <p className="text-[var(--color-text-secondary)]">253601001</p>
                    </div>
                    <div>
                      <p className="mb-1 text-[var(--color-text-muted)]">ОКПО</p>
                      <p className="text-[var(--color-text-secondary)]">14485136</p>
                    </div>
                  </div>
                  <div className="mt-4 border-t border-[var(--color-border)] pt-4">
                    <p className="mb-1 text-[var(--color-text-muted)]">Юридический адрес</p>
                    <p className="text-[var(--color-text-secondary)]">
                      690091, Приморский кр., г. Владивосток, ул. Суханова, д. 11 офис 77
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </Section>
      </Container>
    </main>
  );
}
