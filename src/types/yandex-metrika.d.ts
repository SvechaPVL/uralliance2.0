/**
 * TypeScript declarations for Yandex Metrika
 *
 * Provides type safety for window.ym() calls
 */

declare global {
  interface Window {
    ym?: (
      counterId: number,
      method: string,
      ...args: any[]
    ) => void;
  }
}

export {};
