import type { Product } from '@/api/product/types';
import type { OrderItem } from '../order/types';

export interface AdminStats {
  totalUsers: number;
  totalSellers: number;
  totalProducts: number;
  totalOrders: number;
}

export interface SellerApprovalRequest {
  sellerId: string;
  userId: string;
  companyName: string;
  sellerName: string; // Added to fix lint
  businessNumber: string;
  representativeName: string;
  contactNumber: string;
  email: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestedAt: string;
}

export interface Seller {
  sellerId: string;
  sellerName: string;
  businessNumber: string;
  storeIntro: string;
  contactEmail: string;
  contactPhone: string;
  sellerGrade: 'NEWER' | 'REGULAR' | 'TRUSTED';
  isA11yGuarantee: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SellerDetail extends Seller {
  profileStatus: string;
  submitDate: string;
  approvedDate: string;
  lastUpdatedDate: string;
  orders: OrderItem[];
  products: Product[];
}

export interface DashboardStats {
  pendingSellerCount: number;
  pendingProductCount: number;
}

export interface AdminOrderSearchParams {
  searchType: string;
  keyword: string;
  startDate: string;
  endDate: string;
}

export interface UpdateUserRoleRequest {
  userId: string;
  role: 'USER' | 'SELLER' | 'ADMIN';
}
