import axiosInstance from '@/api/axios-instance';

export const cartApi = {
  getCartItems: async () => {
    const resp = await axiosInstance.get('/v1/cart/me');
    return resp.data;
  },

  getCartItemNumber: async () => {
    const resp = await axiosInstance.get('/v1/cart/me/items/count');
    return resp.data;
  },

  addCartItem: async (cartItemId, quantity) => {
    const resp = await axiosInstance.patch(`/v1/cart/items/${cartItemId}`, {
      quantity: quantity,
    });
    return resp.data;
  },

  deleteCartItems: async (itemIds) => {
    await axiosInstance.delete(`/v1/cart/items`, {
      data: {
        itemIds,
      },
    });
  },
};
