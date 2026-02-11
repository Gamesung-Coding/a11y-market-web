import type { SellerGrade, SellerSubmitStatus } from '../seller/types';
import type { UserRole } from '../user/types';

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
  status: SellerSubmitStatus;
  requestedAt: string;
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
  role: UserRole;
}

export interface AdminSellerUpdateRequest {
  sellerName: string;
  businessNumber: string;
  sellerGrade: SellerGrade;
  a11yGuarantee: boolean;
}
