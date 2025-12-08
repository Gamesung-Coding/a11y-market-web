import axiosInstance from '@/api/axios-instance';

export const cartApi = {
  getCartItems: async () => {
    try {
      const resp = await axiosInstance.get('/v1/cart/me');
      return resp;
    } catch (err) {
      console.error('Failed to get cart items:', err);
    }
  },

  getCartItemCount: async () => {
    try {
      const resp = await axiosInstance.get('/v1/cart/me/items/count');
      return resp;
    } catch (err) {
      console.error('Failed to get cart item number:', err);
    }
  },

  addCartItem: async (productId, quantity) => {
    try {
      const resp = await axiosInstance.post(`/v1/cart/me/items`, {
        productId: productId,
        quantity: quantity,
      });
      if (resp.status === 201) {
        return resp;
      }
    } catch (err) {
      console.error('Failed to add cart item:', err);
    }
  },

  updateCartItemQuantity: async (itemId, quantity) => {
    try {
      const resp = await axiosInstance.patch(`/v1/cart/me/items/${itemId}`, {
        quantity: quantity,
      });
      if (resp.status === 200) {
        return resp;
      } else {
        throw new Error('Failed to update cart item quantity');
      }
    } catch (err) {
      console.error('Failed to update cart item quantity:', err);
    }
  },

  deleteCartItems: async (itemIds) => {
    try {
      const resp = await axiosInstance.delete(`/v1/cart/me/items`, {
        data: {
          itemIds: itemIds,
        },
      });
      return resp;
    } catch (err) {
      console.error('Failed to delete cart items:', err);
    }
  },
};
