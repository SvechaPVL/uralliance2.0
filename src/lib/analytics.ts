/**
 * Analytics Utility for Yandex Metrika
 *
 * Provides type-safe goal tracking and A/B testing functionality
 */

// Yandex Metrika goal names - all possible goals
export type MetrikaGoal =
  // Tier 1: Critical Conversions
  | "contact_form_submit"
  | "contact_form_start"
  | "contact_form_error"
  | "phone_click"
  | "email_click"
  | "whatsapp_click"
  | "telegram_click"
  // Tier 2: Engagement
  | "price_page_view"
  | "services_legal_view"
  | "services_tech_view"
  | "service_detail_view"
  | "contact_section_view"
  // Tier 3: Micro-conversions
  | "cta_hero_legal"
  | "cta_hero_tech"
  | "price_filter_change"
  | "price_sort_change"
  | "price_card_click"
  // A/B Tests
  | `ab_test_hero_cta_variant_${"A" | "B" | "C"}`
  | `ab_test_form_position_variant_${"A" | "B" | "C"}`
  | `ab_test_messenger_order_variant_${"A" | "B" | "C"}`;

export type ABTestName =
  | "hero_cta"
  | "form_position"
  | "messenger_order";

export type ABVariant = "A" | "B" | "C";

interface GoalParams {
  [key: string]: string | number | boolean;
}

/**
 * Check if Yandex Metrika is available
 */
function isMetrikaAvailable(): boolean {
  if (typeof window === "undefined") return false;
  if (!window.ym) return false;

  const counterId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
  if (!counterId) {
    console.warn("[Analytics] Yandex Metrika counter ID not found");
    return false;
  }

  return true;
}

/**
 * Track a Yandex Metrika goal
 *
 * @param goalName - Name of the goal to track
 * @param params - Optional parameters to pass with the goal
 *
 * @example
 * reachGoal('contact_form_submit', { service: 'legal' });
 * reachGoal('phone_click');
 */
export function reachGoal(goalName: MetrikaGoal, params?: GoalParams): void {
  if (!isMetrikaAvailable() || !window.ym) {
    console.log(`[Analytics] Goal: ${goalName}`, params);
    return;
  }

  const counterId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID!;

  try {
    window.ym(Number(counterId), "reachGoal", goalName, params);
    console.log(`[Analytics] ✓ Goal tracked: ${goalName}`, params);
  } catch (error) {
    console.error(`[Analytics] Failed to track goal ${goalName}:`, error);
  }
}

/**
 * Track a custom event (wrapper for reachGoal with easier typing)
 */
export function trackEvent(
  category: "form" | "cta" | "link" | "messenger" | "page",
  action: string,
  label?: string,
  value?: number
): void {
  const eventName = `${category}_${action}` as MetrikaGoal;
  const params: GoalParams = {};

  if (label) params.label = label;
  if (value !== undefined) params.value = value;

  reachGoal(eventName, params);
}

/**
 * Track phone click
 */
export function trackPhoneClick(phoneNumber?: string): void {
  reachGoal("phone_click", { phone: phoneNumber || "+74232028878" });
}

/**
 * Track email click
 */
export function trackEmailClick(email?: string): void {
  reachGoal("email_click", { email: email || "info@uralliance.ru" });
}

/**
 * Track messenger click
 */
export function trackMessengerClick(
  messenger: "whatsapp" | "telegram",
  location?: string
): void {
  const goal = messenger === "whatsapp" ? "whatsapp_click" : "telegram_click";
  reachGoal(goal, location ? { location } : undefined);
}

/**
 * Track CTA button click
 */
export function trackCTAClick(
  location: "hero_legal" | "hero_tech" | string,
  label?: string
): void {
  const goal = location.startsWith("hero_") ? (location as "cta_hero_legal" | "cta_hero_tech") : undefined;

  if (goal) {
    reachGoal(goal, label ? { label } : undefined);
  } else {
    trackEvent("cta", location, label);
  }
}

// =============================================================================
// A/B TESTING UTILITIES
// =============================================================================

const AB_TEST_STORAGE_KEY = "uralliance_ab_tests";

interface ABTestConfig {
  [testName: string]: ABVariant;
}

/**
 * Get stored A/B test configuration
 */
function getABTestConfig(): ABTestConfig {
  if (typeof window === "undefined") return {};

  try {
    const stored = localStorage.getItem(AB_TEST_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * Save A/B test configuration
 */
function saveABTestConfig(config: ABTestConfig): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(AB_TEST_STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.error("[Analytics] Failed to save A/B test config:", error);
  }
}

/**
 * Get or assign A/B test variant for a user
 *
 * @param testName - Name of the A/B test
 * @param variants - Array of variants to choose from (default: ['A', 'B'])
 * @returns The assigned variant
 *
 * @example
 * const variant = getABVariant('hero_cta');
 * const variant = getABVariant('form_position', ['A', 'B', 'C']);
 */
export function getABVariant(
  testName: ABTestName,
  variants: ABVariant[] = ["A", "B"]
): ABVariant {
  const config = getABTestConfig();

  // Check if user already has a variant for this test
  if (config[testName]) {
    return config[testName];
  }

  // Assign a new random variant
  const randomIndex = Math.floor(Math.random() * variants.length);
  const variant = variants[randomIndex];

  // Save the variant
  config[testName] = variant;
  saveABTestConfig(config);

  // Track the variant assignment
  const goalName = `ab_test_${testName}_variant_${variant}` as MetrikaGoal;
  reachGoal(goalName, { test: testName, variant, timestamp: Date.now() });

  console.log(`[Analytics] A/B Test "${testName}": Assigned variant ${variant}`);

  return variant;
}

/**
 * Force set an A/B test variant (useful for testing)
 */
export function setABVariant(testName: ABTestName, variant: ABVariant): void {
  const config = getABTestConfig();
  config[testName] = variant;
  saveABTestConfig(config);

  console.log(`[Analytics] A/B Test "${testName}": Forced variant ${variant}`);
}

/**
 * Reset all A/B tests (useful for development/testing)
 */
export function resetABTests(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(AB_TEST_STORAGE_KEY);
    console.log("[Analytics] All A/B tests reset");
  } catch (error) {
    console.error("[Analytics] Failed to reset A/B tests:", error);
  }
}

/**
 * Get all active A/B test variants
 */
export function getActiveABTests(): ABTestConfig {
  return getABTestConfig();
}

// =============================================================================
// PAGE VIEW TRACKING
// =============================================================================

/**
 * Track page view (called automatically by Next.js, but can be used manually)
 */
export function trackPageView(url: string): void {
  if (!isMetrikaAvailable() || !window.ym) return;

  const counterId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID!;

  try {
    window.ym(Number(counterId), "hit", url);
  } catch (error) {
    console.error("[Analytics] Failed to track page view:", error);
  }
}

// =============================================================================
// EXPORTS FOR WINDOW (Development/Debugging)
// =============================================================================

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  // Expose analytics utilities to window for debugging
  (window as any).analytics = {
    reachGoal,
    trackEvent,
    trackPhoneClick,
    trackEmailClick,
    trackMessengerClick,
    trackCTAClick,
    getABVariant,
    setABVariant,
    resetABTests,
    getActiveABTests,
  };

  console.log("[Analytics] Debug utilities available at window.analytics");
}
