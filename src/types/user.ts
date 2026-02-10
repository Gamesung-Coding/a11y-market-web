import type { SellerSubmitStatus } from './seller';

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
