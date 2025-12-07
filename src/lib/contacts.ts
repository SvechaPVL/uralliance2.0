/**
 * Centralized Contact Information
 *
 * Single source of truth for all contact data across the application.
 * Import this module instead of hardcoding contact information.
 *
 * @example
 * ```ts
 * import { contacts, getPhoneLink, getEmailLink, getMessengerLinks } from "@/lib/contacts";
 *
 * // Access phone
 * <a href={contacts.phone.main.link}>{contacts.phone.main.display}</a>
 *
 * // Get messenger links
 * const { whatsapp, telegram } = getMessengerLinks("Привет!");
 * ```
 */

import contactsData from "../../content/contacts.json";

// ============================================================================
// Types
// ============================================================================

export interface PhoneNumber {
  display: string;
  raw: string;
  link: string;
}

export interface EmailAddress {
  display: string;
  link: string;
}

export interface MessengerContact {
  phone?: string;
  username?: string;
  display?: string;
  link: string;
  defaultMessage: string;
}

export interface Address {
  full: string;
  short: string;
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  countryName: string;
  building: string;
  office: string;
  description: string;
  mapLink: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface WorkingHours {
  weekdays: {
    display: string;
    days: string[];
    opens: string;
    closes: string;
  };
  weekend: {
    display: string;
    note: string;
  };
  timezone: string;
}

export interface Company {
  name: string;
  brand: string;
  tagline: string;
  fullName: string;
  shortName: string;
  alternateName: string[];
  foundedYear: number;
  description: {
    short: string;
    full: string;
  };
}

export interface LegalInfo {
  inn: string;
  ogrn: string;
  kpp: string;
  okpo: string;
  capital: {
    amount: number;
    currency: string;
  };
}

export interface SocialLinks {
  telegram: string;
  whatsapp: string;
  vk: string;
}

export interface ContactsData {
  company: Company;
  legal: LegalInfo;
  phone: {
    main: PhoneNumber;
    secondary: PhoneNumber;
  };
  email: EmailAddress;
  messengers: {
    whatsapp: MessengerContact;
    telegram: MessengerContact;
  };
  address: Address;
  coordinates: Coordinates;
  workingHours: WorkingHours;
  responseTime: {
    business: string;
    urgent: string;
  };
  social: SocialLinks;
  website: {
    url: string;
    domain: string;
  };
  services: {
    legal: string[];
    tech: string[];
    additional: string[];
  };
  priceRange: string;
}

// ============================================================================
// Main Export - Type-safe contacts object
// ============================================================================

export const contacts = contactsData as ContactsData;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get phone link with tel: protocol
 */
export function getPhoneLink(type: "main" | "secondary" = "main"): string {
  return contacts.phone[type].link;
}

/**
 * Get display-formatted phone number
 */
export function getPhoneDisplay(type: "main" | "secondary" = "main"): string {
  return contacts.phone[type].display;
}

/**
 * Get raw phone number (for APIs, analytics, etc.)
 */
export function getPhoneRaw(type: "main" | "secondary" = "main"): string {
  return contacts.phone[type].raw;
}

/**
 * Get email mailto link
 */
export function getEmailLink(): string {
  return contacts.email.link;
}

/**
 * Get display email
 */
export function getEmailDisplay(): string {
  return contacts.email.display;
}

/**
 * Generate WhatsApp link with custom message
 */
export function getWhatsAppLink(message?: string): string {
  const msg = message || contacts.messengers.whatsapp.defaultMessage;
  const phone = contacts.messengers.whatsapp.phone;
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

/**
 * Generate Telegram link with custom message
 */
export function getTelegramLink(message?: string): string {
  const msg = message || contacts.messengers.telegram.defaultMessage;
  const username = contacts.messengers.telegram.username;
  return `https://t.me/${username}?text=${encodeURIComponent(msg)}`;
}

/**
 * Generate email mailto link with subject and body
 */
export function getEmailWithMessage(subject?: string, body?: string): string {
  const defaultSubject = "Запрос с сайта Uralliance";
  const defaultBody = "Здравствуйте! Хочу узнать больше о ваших услугах.";

  const params = new URLSearchParams({
    subject: subject || defaultSubject,
    body: body || defaultBody,
  });

  return `mailto:${contacts.email.display}?${params.toString()}`;
}

/**
 * Get all messenger links at once
 */
export function getMessengerLinks(customMessage?: string) {
  return {
    whatsapp: getWhatsAppLink(customMessage),
    telegram: getTelegramLink(customMessage),
    email: getEmailWithMessage(undefined, customMessage),
  };
}

/**
 * Get address for Schema.org PostalAddress
 */
export function getSchemaAddress() {
  return {
    "@type": "PostalAddress" as const,
    streetAddress: contacts.address.street,
    addressLocality: contacts.address.city,
    addressRegion: contacts.address.region,
    postalCode: contacts.address.postalCode,
    addressCountry: contacts.address.country,
  };
}

/**
 * Get coordinates for Schema.org GeoCoordinates
 */
export function getSchemaGeo() {
  return {
    "@type": "GeoCoordinates" as const,
    latitude: contacts.coordinates.lat,
    longitude: contacts.coordinates.lng,
  };
}

/**
 * Get opening hours for Schema.org OpeningHoursSpecification
 */
export function getSchemaOpeningHours() {
  return {
    "@type": "OpeningHoursSpecification" as const,
    dayOfWeek: contacts.workingHours.weekdays.days,
    opens: contacts.workingHours.weekdays.opens,
    closes: contacts.workingHours.weekdays.closes,
  };
}

/**
 * Get contact point for Schema.org ContactPoint
 */
export function getSchemaContactPoint() {
  return {
    "@type": "ContactPoint" as const,
    telephone: contacts.phone.main.raw,
    email: contacts.email.display,
    contactType: "customer support",
    areaServed: "RU",
    availableLanguage: ["Russian", "ru"],
  };
}

/**
 * Get social links array for Schema.org sameAs
 */
export function getSchemaSameAs(): string[] {
  return [contacts.social.telegram, contacts.social.whatsapp, contacts.social.vk];
}

// ============================================================================
// Constants for backward compatibility
// ============================================================================

export const ORGANIZATION_NAME = contacts.company.name;
export const ORGANIZATION_PHONE = contacts.phone.main.raw;
export const ORGANIZATION_EMAIL = contacts.email.display;
export const SITE_URL = contacts.website.url;
