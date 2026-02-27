// Currency formatter — MMK
export function formatPrice(amount: number): string {
  return `${Math.round(amount).toLocaleString()} MMK`;
}

export function formatPriceShort(amount: number): string {
  return `${Math.round(amount).toLocaleString()} MMK`;
}
