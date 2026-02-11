import type { SellerSubmitStatus } from '@/api/seller/types';

const EUserRole = {
  USER: 'USER',
  SELLER: 'SELLER',
  ADMIN: 'ADMIN',
  TEMP: 'TEMP',
};

export type UserRole = keyof typeof EUserRole;

export interface User {
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userNickname: string;
  userRole: UserRole;
  createdAt: string;
  updatedAt: string;
  sellerSubmitStatus?: SellerSubmitStatus | null;
}

export interface UpdateProfileRequest {
  userName?: string;
  userPhone?: string;
  userNickname?: string;
  userPassword?: string;
}
