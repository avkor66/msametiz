export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartItemDetailed extends CartItem {
  name: string;
  price: number;
  imageUrl: string;
  lineTotal: number;
}