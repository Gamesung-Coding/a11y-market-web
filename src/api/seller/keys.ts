export const SELLER_KEYS = {
  all: ['seller'] as const,
  dashboard: () => [...SELLER_KEYS.all, 'dashboard'] as const,
  stats: () => [...SELLER_KEYS.dashboard(), 'stats'] as const,
  revenue: (year: number, month: number) =>
    [...SELLER_KEYS.dashboard(), 'revenue', year, month] as const,
  topProducts: () => [...SELLER_KEYS.dashboard(), 'top-products'] as const,
  recentOrders: () => [...SELLER_KEYS.dashboard(), 'recent-orders'] as const,
  products: (page: number, size: number) => [...SELLER_KEYS.all, 'products', page, size] as const,
  orders: (page: number, size: number, status: string | null) =>
    [...SELLER_KEYS.all, 'orders', page, size, status] as const,
  orderSummary: () => [...SELLER_KEYS.all, 'order-summary'] as const,
  info: (sellerId: string) => [...SELLER_KEYS.all, 'info', sellerId] as const,
};
