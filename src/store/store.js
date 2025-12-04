// import { injectStore } from '@/api/axiosInstance';
import a11yReducer from '@/store/a11y-slice';
import authReducer from '@/store/auth-slice';
import orderReducer from '@/store/order-slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // 여기에 slice 리듀서들을 추가
    a11y: a11yReducer,
    order: orderReducer,
  },
  devTools: import.meta.env.DEV,
});
