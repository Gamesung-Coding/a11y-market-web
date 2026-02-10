import { cartApi } from '@/api/cart-api';
import { CART_KEYS } from '@/queries/keys';
import { useAuthStore } from '@/store/auth-store';
import { useQuery } from '@tanstack/react-query';

export const useCartCount = () => {
  return useQuery({
    queryKey: CART_KEYS.count(),
    queryFn: () => {
      if (useAuthStore().isAuthenticated) {
        return cartApi.getCartItemCount();
      }

      return 0;
    },
    initialData: 0,
  });
};

export const useCartItems = () => {
  return useQuery({
    queryKey: CART_KEYS.items(),
    queryFn: () => cartApi.getCartItems(),
  });
};
