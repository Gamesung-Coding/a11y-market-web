export const ADMIN_KEYS = {
  all: ['admin'] as const,
  users: () => [...ADMIN_KEYS.all, 'users'] as const,
  sellerDetail: (sellerId: string) => [...ADMIN_KEYS.all, 'seller-detail', sellerId] as const,
  pendingProducts: () => [...ADMIN_KEYS.all, 'pending-products'] as const,
  pendingSellers: () => [...ADMIN_KEYS.all, 'pending-sellers'] as const,
};
