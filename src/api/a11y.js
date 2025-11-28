// src/api/a11yAPI.js

import axiosInstance from './axiosInstance';

export async function updateUserA11ySettings(settings) {
  try {
    const response = await axiosInstance.put('/api/v1/users/me/a11y', settings);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('접근성 설정 저장 실패');
    }
  } catch (err) {
    throw err;
  }
}
