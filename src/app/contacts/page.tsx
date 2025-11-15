"use client";

import { Container } from "@/components/layout/Container";
import { Card } from "@/components/primitives/card";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { Input } from "@/components/primitives/input";
import { MapPin, Phone, Mail, Clock, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import type { Metadata } from "next";

/**
 * Contacts Page
 *
 * Contact information, map, and contact form
 */

const contactInfo = [
  {
    icon: MapPin,
    title: "Адрес офиса",
    value: "г. Екатеринбург, ул. Малышева, 51",
    color: "legal" as const,
  },
  {
    icon: Phone,
    title: "Телефон",
    value: "+7 (343) 123-45-67",
    href: "tel:+73431234567",
    color: "tech" as const,
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@uralliance.ru",
    href: "mailto:info@uralliance.ru",
    color: "legal" as const,
  },
  {
    icon: Clock,
    title: "Режим работы",
    value: "Пн-Пт: 9:00 - 18:00",
    color: "tech" as const,
  },
];

const messengers = [
  {
    name: "Telegram",
    url: "https://t.me/uralliance",
    color: "from-[#0088cc] to-[#0088cc]",
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/79000000000",
    color: "from-[#25D366] to-[#128C7E]",
  },
];

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-neutral-50 to-white py-24 dark:from-neutral-900 dark:to-neutral-950">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold md:text-6xl">Контакты</h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              Свяжитесь с нами удобным способом — мы всегда на связи и готовы помочь
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Info Grid */}
      <section className="py-16">
        <Container>
          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const content = (
                <Card
                  className={`group h-full border-2 p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                    info.color === "legal"
                      ? "hover:border-legal-500 dark:hover:border-legal-400"
                      : "hover:border-tech-500 dark:hover:border-tech-400"
                  }`}
                >
                  <div className="mb-4 flex justify-center">
                    <Icon
                      className={`h-12 w-12 ${
                        info.color === "legal"
                          ? "text-legal-500 dark:text-legal-400"
                          : "text-tech-500 dark:text-tech-400"
                      }`}
                    />
                  </div>
                  <h3 className="mb-2 font-semibold text-neutral-600 dark:text-neutral-400">
                    {info.title}
                  </h3>
                  <p className="text-lg font-medium">{info.value}</p>
                </Card>
              );

              return info.href ? (
                <a key={index} href={info.href} className="block transition-transform">
                  {content}
                </a>
              ) : (
                <div key={index}>{content}</div>
              );
            })}
          </div>

          {/* Messengers */}
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-2xl font-bold">Напишите нам в мессенджер</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {messengers.map((messenger, index) => (
                <a
                  key={index}
                  href={messenger.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-lg bg-gradient-to-r ${messenger.color} px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                >
                  <MessageSquare className="h-5 w-5" />
                  {messenger.name}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Map Section */}
      <section className="bg-neutral-100 py-16 dark:bg-neutral-900">
        <Container>
          <h2 className="mb-8 text-center text-3xl font-bold">Как нас найти</h2>
          <Card className="overflow-hidden border-2 p-0">
            {/* Yandex Maps Embed */}
            <div className="relative h-[500px] w-full">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=60.597474%2C56.838011&z=17&l=map&pt=60.597474,56.838011,pm2rdl"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                className="rounded-lg"
                title="Карта офиса Uralliance"
              />
            </div>
          </Card>
          <p className="mt-4 text-center text-neutral-600 dark:text-neutral-400">
            г. Екатеринбург, ул. Малышева, 51 (БЦ «Высоцкий», 5 этаж)
          </p>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Напишите нам</h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400">
                Заполните форму, и мы свяжемся с вами в ближайшее время
              </p>
            </div>

            <Card className="border-2 p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block font-semibold text-neutral-700 dark:text-neutral-300"
                    >
                      Ваше имя <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Иван Иванов"
                      className="border-2"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block font-semibold text-neutral-700 dark:text-neutral-300"
                    >
                      Телефон <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+7 (900) 000-00-00"
                      className="border-2"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-semibold text-neutral-700 dark:text-neutral-300"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="border-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block font-semibold text-neutral-700 dark:text-neutral-300"
                  >
                    Сообщение <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Расскажите о вашей задаче..."
                    rows={6}
                    className="focus:border-legal-500 dark:focus:border-tech-400 w-full rounded-lg border-2 border-neutral-300 px-4 py-3 transition-colors focus:outline-none dark:border-neutral-700 dark:bg-neutral-900"
                  />
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    className="from-legal-500 to-tech-500 hover:from-legal-600 hover:to-tech-600 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <Send className="h-5 w-5" />
                    Отправить сообщение
                  </Button>
                </div>

                <p className="text-center text-sm text-neutral-500 dark:text-neutral-500">
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <a href="/privacy" className="text-legal-500 dark:text-tech-400 hover:underline">
                    политикой конфиденциальности
                  </a>
                </p>
              </form>
            </Card>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-neutral-50 to-white py-16 dark:from-neutral-900 dark:to-neutral-950">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 flex justify-center gap-2">
              <Badge variant="legal">Legal</Badge>
              <Badge variant="tech">Tech</Badge>
            </div>
            <h2 className="mb-4 text-2xl font-bold">Предпочитаете личную встречу?</h2>
            <p className="mb-6 text-neutral-600 dark:text-neutral-400">
              Приходите в наш офис в центре Екатеринбурга для бесплатной консультации
            </p>
            <a
              href="tel:+73431234567"
              className="border-legal-500 hover:bg-legal-500 dark:border-tech-400 dark:hover:bg-tech-400 inline-flex items-center gap-2 rounded-lg border-2 px-6 py-3 font-semibold transition-all duration-300 hover:text-white"
            >
              <Phone className="h-5 w-5" />
              Позвонить и записаться
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
