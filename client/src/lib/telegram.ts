import type { TelegramWebApp } from '../telegram-web-app';

/**
 * Возвращает объект Telegram.WebApp или null, если приложение запущено не из Telegram.
 */
export function getWebApp(): TelegramWebApp | null {
  return typeof window !== 'undefined' && window.Telegram?.WebApp ? window.Telegram.WebApp : null;
}

/**
 * Проверяет, запущено ли приложение внутри Telegram Mini App.
 */
export function isTelegramWebApp(): boolean {
  return getWebApp() !== null;
}

/**
 * Вызывает haptic feedback при добавлении в корзину и подобных действиях.
 */
export function triggerHaptic(): void {
  const webApp = getWebApp();
  webApp?.HapticFeedback?.impactOccurred?.('light');
}

/**
 * Инициализация Mini App: ready(), expand(), подстановка цветов темы в хедер/фон.
 * Вызывать один раз при старте приложения.
 */
export function initTelegramWebApp(): void {
  const webApp = getWebApp();
  if (!webApp) return;

  webApp.ready();
  webApp.expand();

  const { themeParams } = webApp;
  if (themeParams?.bg_color) {
    webApp.setBackgroundColor(themeParams.bg_color);
  }
  if (themeParams?.secondary_bg_color ?? themeParams?.bg_color) {
    webApp.setHeaderColor(themeParams.secondary_bg_color ?? themeParams.bg_color ?? '#fff');
  }
}
