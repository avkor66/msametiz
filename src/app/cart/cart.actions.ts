import {createAction, props} from "@ngrx/store";
import {Product} from "../products/product.model"; // Импортируем обновленный Product

export const addItem = createAction(
  '[cart Page] Add Item',
  props<{productId: string; quantity: number }>()
);

export const removeItem = createAction(
  '[cart Page] remove Item',
  props<{productId: string}>()
);

export const increaseQuantity = createAction(
  '[cart Page] increase Item',
  props<{productId: string}>()
);

export const decreaseQuantity = createAction(
  '[cart Page] decrease Item',
  props<{productId: string}>()
);

export const clearCart = createAction(
  '[cart Page] remove all Items'
);


// НОВОЕ ДЕЙСТВИЕ: Добавление продукта, созданного в калькуляторе
export const addConfiguredProductToCart = createAction(
  '[Cart Page] Add Configured Product to Cart',
  props<{ product: Product; quantity: number }>()
);

export interface CartItem {
  productId: string;
  quantity: number;
}
// ... (CartItemDetailed)