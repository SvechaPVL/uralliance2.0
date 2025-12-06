"use client";

import React from "react";

/**
 * SVG Mockup: Restaurant Landing Page
 */
export function RestaurantMockup() {
  return (
    <svg className="h-full w-full" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Header */}
      <rect width="1440" height="80" fill="#1F2937" />
      <text x="60" y="50" className="fill-white font-bold" fontSize="24">BELLA CUCINA</text>
      <text x="1200" y="50" className="fill-white" fontSize="16">Меню</text>
      <text x="1280" y="50" className="fill-white" fontSize="16">Контакты</text>

      {/* Hero Section */}
      <rect y="80" width="1440" height="500" fill="#FEF3C7" />

      {/* Hero Image Placeholder */}
      <circle cx="720" cy="330" r="180" fill="#F59E0B" opacity="0.3" />
      <circle cx="650" cy="280" r="80" fill="#F59E0B" opacity="0.5" />
      <circle cx="800" cy="300" r="100" fill="#F59E0B" opacity="0.4" />

      {/* Hero Text */}
      <text x="720" y="480" className="fill-gray-800 font-bold" fontSize="48" textAnchor="middle">Вкус Италии в Москве</text>
      <text x="720" y="520" className="fill-gray-600" fontSize="20" textAnchor="middle">Аутентичная кухня • Уютная атмосфера • Доставка</text>

      {/* CTA Button */}
      <rect x="620" y="540" width="200" height="50" rx="25" fill="#EF4444" />
      <text x="720" y="572" className="fill-white font-semibold" fontSize="18" textAnchor="middle">Забронировать</text>

      {/* Features Section */}
      <rect y="580" width="1440" height="320" fill="#FFFFFF" />

      {/* Feature Cards */}
      <rect x="120" y="640" width="360" height="200" rx="12" fill="#F3F4F6" />
      <rect x="540" y="640" width="360" height="200" rx="12" fill="#F3F4F6" />
      <rect x="960" y="640" width="360" height="200" rx="12" fill="#F3F4F6" />

      {/* Icons */}
      <circle cx="300" cy="720" r="30" fill="#EF4444" />
      <circle cx="720" cy="720" r="30" fill="#EF4444" />
      <circle cx="1140" cy="720" r="30" fill="#EF4444" />

      <text x="300" y="780" className="fill-gray-800 font-semibold" fontSize="18" textAnchor="middle">Свежие продукты</text>
      <text x="720" y="780" className="fill-gray-800 font-semibold" fontSize="18" textAnchor="middle">Быстрая доставка</text>
      <text x="1140" y="780" className="fill-gray-800 font-semibold" fontSize="18" textAnchor="middle">Авторские рецепты</text>
    </svg>
  );
}

/**
 * SVG Mockup: Auto Dealership Landing Page
 */
export function AutoDealershipMockup() {
  return (
    <svg className="h-full w-full" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Header */}
      <rect width="1440" height="80" fill="#0F172A" />
      <text x="60" y="50" className="fill-white font-bold" fontSize="24">PREMIUM AUTO</text>
      <text x="1150" y="50" className="fill-white" fontSize="16">Каталог</text>
      <text x="1250" y="50" className="fill-white" fontSize="16">Trade-in</text>
      <text x="1350" y="50" className="fill-white" fontSize="16">Контакты</text>

      {/* Hero Section with gradient */}
      <defs>
        <linearGradient id="autoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>
      <rect y="80" width="1440" height="500" fill="url(#autoGradient)" />

      {/* Car silhouette */}
      <ellipse cx="720" cy="450" rx="400" ry="40" fill="#000000" opacity="0.2" />
      <rect x="400" y="300" width="640" height="140" rx="20" fill="#CBD5E1" opacity="0.9" />
      <rect x="480" y="280" width="200" height="100" rx="8" fill="#94A3B8" opacity="0.9" />
      <rect x="760" y="280" width="200" height="100" rx="8" fill="#94A3B8" opacity="0.9" />
      <circle cx="520" cy="440" r="45" fill="#1F2937" />
      <circle cx="520" cy="440" r="25" fill="#475569" />
      <circle cx="920" cy="440" r="45" fill="#1F2937" />
      <circle cx="920" cy="440" r="25" fill="#475569" />

      {/* Hero Text */}
      <text x="720" y="220" className="fill-white font-bold" fontSize="56" textAnchor="middle">Автомобиль мечты</text>
      <text x="720" y="260" className="fill-blue-200" fontSize="24" textAnchor="middle">Кредит от 0.1% • Trade-in • Гарантия 3 года</text>

      {/* Price Badge */}
      <rect x="600" y="520" width="240" height="60" rx="30" fill="#3B82F6" />
      <text x="720" y="558" className="fill-white font-bold" fontSize="22" textAnchor="middle">от 2 500 000 ₽</text>

      {/* Stats Section */}
      <rect y="580" width="1440" height="320" fill="#F8FAFC" />

      <rect x="180" y="650" width="280" height="180" rx="16" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
      <rect x="580" y="650" width="280" height="180" rx="16" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
      <rect x="980" y="650" width="280" height="180" rx="16" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />

      <text x="320" y="720" className="fill-blue-600 font-bold" fontSize="42" textAnchor="middle">500+</text>
      <text x="320" y="760" className="fill-gray-600" fontSize="18" textAnchor="middle">Авто в наличии</text>

      <text x="720" y="720" className="fill-blue-600 font-bold" fontSize="42" textAnchor="middle">22 года</text>
      <text x="720" y="760" className="fill-gray-600" fontSize="18" textAnchor="middle">На рынке</text>

      <text x="1120" y="720" className="fill-blue-600 font-bold" fontSize="42" textAnchor="middle">98%</text>
      <text x="1120" y="760" className="fill-gray-600" fontSize="18" textAnchor="middle">Довольных клиентов</text>
    </svg>
  );
}

/**
 * SVG Mockup: Law Firm Landing Page
 */
export function LawFirmMockup() {
  return (
    <svg className="h-full w-full" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Header */}
      <rect width="1440" height="80" fill="#FFFFFF" />
      <rect y="79" width="1440" height="1" fill="#E5E7EB" />
      <text x="60" y="50" className="fill-gray-900 font-bold" fontSize="24">ПРАВОВОЙ АЛЬЯНС</text>
      <text x="1100" y="50" className="fill-gray-700" fontSize="16">Услуги</text>
      <text x="1200" y="50" className="fill-gray-700" fontSize="16">О нас</text>
      <text x="1280" y="50" className="fill-gray-700" fontSize="16">Контакты</text>

      {/* Hero Section */}
      <rect y="80" width="1440" height="500" fill="#F9FAFB" />

      {/* Decorative elements */}
      <circle cx="1100" cy="250" r="150" fill="#6366F1" opacity="0.1" />
      <circle cx="1200" cy="350" r="100" fill="#6366F1" opacity="0.08" />

      {/* Hero Content */}
      <text x="120" y="220" className="fill-gray-900 font-bold" fontSize="52">Защитим ваши</text>
      <text x="120" y="280" className="fill-gray-900 font-bold" fontSize="52">интересы в суде</text>
      <text x="120" y="340" className="fill-gray-600" fontSize="22">Опыт 20+ лет • Выигрыш 94% дел • Бесплатная консультация</text>

      {/* CTA Buttons */}
      <rect x="120" y="380" width="220" height="56" rx="8" fill="#6366F1" />
      <text x="230" y="415" className="fill-white font-semibold" fontSize="18" textAnchor="middle">Консультация</text>

      <rect x="360" y="380" width="220" height="56" rx="8" fill="#FFFFFF" stroke="#6366F1" strokeWidth="2" />
      <text x="470" y="415" className="fill-indigo-600 font-semibold" fontSize="18" textAnchor="middle">Наши кейсы</text>

      {/* Services Section */}
      <rect y="580" width="1440" height="320" fill="#FFFFFF" />

      {/* Service Cards */}
      <g>
        <rect x="120" y="640" width="380" height="200" rx="12" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
        <rect x="130" y="660" width="60" height="60" rx="8" fill="#EEF2FF" />
        <rect x="145" y="675" width="30" height="30" fill="#6366F1" opacity="0.6" />
        <text x="210" y="695" className="fill-gray-900 font-semibold" fontSize="20">Арбитраж</text>
        <text x="130" y="730" className="fill-gray-600" fontSize="14">Споры по договорам</text>
        <text x="130" y="750" className="fill-gray-600" fontSize="14">Взыскание задолженности</text>
        <text x="130" y="770" className="fill-gray-600" fontSize="14">Защита в суде</text>
      </g>

      <g>
        <rect x="530" y="640" width="380" height="200" rx="12" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
        <rect x="540" y="660" width="60" height="60" rx="8" fill="#EEF2FF" />
        <rect x="555" y="675" width="30" height="30" fill="#6366F1" opacity="0.6" />
        <text x="620" y="695" className="fill-gray-900 font-semibold" fontSize="20">Корпоративное право</text>
        <text x="540" y="730" className="fill-gray-600" fontSize="14">Регистрация бизнеса</text>
        <text x="540" y="750" className="fill-gray-600" fontSize="14">Сопровождение сделок</text>
        <text x="540" y="770" className="fill-gray-600" fontSize="14">Договоры и контракты</text>
      </g>

      <g>
        <rect x="940" y="640" width="380" height="200" rx="12" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
        <rect x="950" y="660" width="60" height="60" rx="8" fill="#EEF2FF" />
        <rect x="965" y="675" width="30" height="30" fill="#6366F1" opacity="0.6" />
        <text x="1030" y="695" className="fill-gray-900 font-semibold" fontSize="20">Налоговое право</text>
        <text x="950" y="730" className="fill-gray-600" fontSize="14">Налоговые споры</text>
        <text x="950" y="750" className="fill-gray-600" fontSize="14">Налоговый аудит</text>
        <text x="950" y="770" className="fill-gray-600" fontSize="14">Оптимизация налогов</text>
      </g>
    </svg>
  );
}
