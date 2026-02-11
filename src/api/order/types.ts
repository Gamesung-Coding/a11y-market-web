export interface OrderItem {
  orderItemId: string;
  productId: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  productTotalPrice: number;
  productImageUrl: string;
  orderItemStatus: string;
  hasReview: boolean;
}

export interface Order {
  orderId: string;
  totalPrice: number;
  createdAt: string;
  orderItems: OrderItem[];
}

export interface CreateOrderRequest {
  [key: string]: any;
}

export interface VerifyPaymentRequest {
  orderId: string;
  amount: number;
  paymentKey: string;
}

export interface CancelOrderRequest {
  orderItemId: string;
  cancelReason: string;
}

export interface CheckoutInfoV2Request {
  cartItemIds: string[];
  directOrderItem?: {
    productId: string;
    quantity: number;
  };
}

export interface CheckoutInfoResponse {
  totalAmount: number;
  discountAmount: number;
  paymentAmount: number;
  shippingFee: number;
  orderName: string;
}

export interface OrderDetailResponse {
  orderItem: OrderItem;
  createdAt: string;
  orderId: string;
}
