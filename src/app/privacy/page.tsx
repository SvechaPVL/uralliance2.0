import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/primitives/section";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | Юральянс (Uralliance)",
  description:
    "Политика конфиденциальности ООО «Юральянс». Узнайте, как мы собираем, используем и защищаем ваши персональные данные.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <Section spacing="md">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl md:text-5xl">
              Политика конфиденциальности
            </h1>

            <div className="prose prose-invert max-w-none">
              <p className="mb-6 text-base text-[var(--color-text-secondary)] sm:text-lg">
                Дата последнего обновления: {new Date().toLocaleDateString("ru-RU")}
              </p>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-[var(--color-text-primary)]">
                  1. Общие положения
                </h2>
                <p className="mb-4 text-[var(--color-text-secondary)]">
                  Настоящая Политика конфиденциальности персональных данных (далее — Политика)
                  действует в отношении всей информации, которую ООО &quot;Юральянс&quot; (ИНН
                  2536133736, ОГРН 1032501291591) может получить о Пользователе во время
                  использования сайта uralliance.ru.
                </p>
                <p className="text-[var(--color-text-secondary)]">
                  Использование сайта означает безоговорочное согласие Пользователя с настоящей
                  Политикой и указанными в ней условиями обработки его персональной информации.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-[var(--color-text-primary)]">
                  2. Персональная информация пользователей
                </h2>
                <p className="mb-4 text-[var(--color-text-secondary)]">
                  Персональные данные — информация, относящаяся к определенному или определяемому
                  физическому лицу.
                </p>
                <p className="mb-4 text-[var(--color-text-secondary)]">
                  Мы можем собирать следующую информацию:
                </p>
                <ul className="mb-4 list-inside list-disc space-y-2 text-[var(--color-text-secondary)]">
                  <li>ФИО</li>
                  <li>Контактный телефон</li>
                  <li>Адрес электронной почты</li>
                  <li>Данные о компании (название, ИНН, адрес)</li>
                  <li>Информация о посещении сайта (IP-адрес, браузер, время посещения)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-[var(--color-text-primary)]">
                  3. Цели сбора персональной информации
                </h2>
                <p className="mb-4 text-[var(--color-text-secondary)]">
                  Персональные данные пользователя используются для:
                </p>
                <ul className="mb-4 list-inside list-disc space-y-2 text-[var(--color-text-secondary)]">
                  <li>Связи с Пользователем для предоставления услуг</li>
                  <li>Подготовки коммерческих предложений</li>
                  <li>Информирования об услугах компании</li>
                  <li>Улучшения качества обслуживания</li>
                  <li>Проведения статистических и маркетинговых исследований</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-[var(--color-text-primary)]">
                  4. Защита персональных данных
                </h2>
                <p className="mb-4 text-[var(--color-text-secondary)]">
                  Компания принимает необходимые и достаточные организационные и технические меры
                  для защиты персональной информации Пользователя от неправомерного или случайного
                  доступа, уничтожения, изменения, блокирования, копирования, распространения.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-[var(--color-text-primary)]">
                  5. Изменение Политики конфиденциальности
                </h2>
                <p className="mb-4 text-[var(--color-text-secondary)]">
                  Компания имеет право вносить изменения в настоящую Политику конфиденциальности.
                  Новая редакция Политики вступает в силу с момента ее размещения на Сайте.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-[var(--color-text-primary)]">
                  6. Обратная связь
                </h2>
                <p className="mb-4 text-[var(--color-text-secondary)]">
                  По всем вопросам, касающимся обработки персональных данных, вы можете обратиться к
                  нам:
                </p>
                <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card-bg)] p-6">
                  <p className="mb-2 font-semibold text-[var(--color-text-primary)]">
                    ООО &quot;Юральянс&quot;
                  </p>
                  <p className="mb-1 text-[var(--color-text-secondary)]">ИНН: 2536133736</p>
                  <p className="mb-1 text-[var(--color-text-secondary)]">ОГРН: 1032501291591</p>
                  <p className="mb-1 text-[var(--color-text-secondary)]">
                    Адрес: 690091, Приморский кр., г. Владивосток, ул. Суханова, д. 11 офис 77
                  </p>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
