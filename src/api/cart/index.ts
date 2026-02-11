import axiosInstance from '@/api/axios-instance';
import type {
  AddCartItemRequest,
  CartItemResponse,
  CartItemUpdateResponse,
  UpdateCartItemRequest,
} from './types';

export const cartApi = {
  getCartItems: async (): Promise<CartItemResponse> => {
    const { data } = await axiosInstance.get('/v1/cart/me');
    return data;
  },

  getCartItemCount: async (): Promise<number> => {
    const { data } = await axiosInstance.get<{ count: number }>('/v1/cart/me/items/count');
    return data.count;
  },

  addCartItem: async ({
    productId,
    quantity,
  }: AddCartItemRequest): Promise<CartItemUpdateResponse> => {
    const { data } = await axiosInstance.post<CartItemUpdateResponse>(`/v1/cart/me/items`, {
      productId: productId,
      quantity: quantity,
    });
    return data;
  },

  updateCartItemQuantity: async ({
    itemId,
    quantity,
  }: UpdateCartItemRequest): Promise<CartItemUpdateResponse> => {
    const { data } = await axiosInstance.patch<CartItemUpdateResponse>(
      `/v1/cart/me/items/${itemId}`,
      {
        quantity: quantity,
      },
    );
    return data;
  },

  deleteCartItems: async (itemIds: string[]): Promise<void> => {
    await axiosInstance.delete<void>(`/v1/cart/me/items`, {
      data: {
        itemIds: itemIds,
      },
    });
  },
};
