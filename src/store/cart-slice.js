import { cartApi } from '@/api/cart-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCartCount = createAsyncThunk(
  'cart/fetchCartCount',
  async (_, { rejectWithValue }) => {
    try {
      const resp = await cartApi.getCartItemCount();
      return resp.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

const initialState = {
  itemCount: 0,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartCount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.itemCount = action.payload.count;
      })
      .addCase(fetchCartCount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
