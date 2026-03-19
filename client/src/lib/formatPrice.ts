/**
 * Форматирует цену в стиле UZS (с пробелами между разрядами).
 */
export function formatPrice(price: number, currency = 'UZS'): string {
  const formatted = Math.round(price).toLocaleString('ru-RU').replace(/\s/g, ' ');
  return `${formatted} ${currency}`;
}
