export interface AddCartItemRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  itemId: string;
  quantity: number;
}

export interface CartCountResponse {
  count: number;
}

export interface CartItem {
  cartItemId: string;
  cartId: string;
  productId: string;
  sellerId: string;
  sellerName: string;
  productName: string;
  productPrice: number;
  categoryName: string;
  quantity: number;
  productImageUrl: string;
}

export interface CartItemGroup {
  sellerName: string;
  sellerId: string;
  groupTotal: number;
  items: CartItem[];
}

export interface CartItemResponse {
  items: CartItemGroup[];
  total: number;
}

export interface CartItemUpdateResponse {
  cartItemId: string;
  cartId: string;
  productId: string;
  quantity: number;
}
