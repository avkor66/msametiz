import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromCart from "./cart.reducer";
import * as fromProducts from "../products/product.selectors";
import { CartItemDetailed } from "./cart.model";

export const selectCartState = createFeatureSelector<fromCart.CartState>(fromCart.cartFeatureKey);

export const selectorCartItems = createSelector(
  selectCartState,
  (state : fromCart.CartState) => state.items
);

export const selectCartTotalItems = createSelector(
  selectCartState,
  (state) => state.items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartItemsWithDetails = createSelector(
  selectCartState,
  fromProducts.selectAllProducts,
  (state, products) : CartItemDetailed[] => {
    if(!products || products.length === 0) return [];
    return state.items.map(item => {
      const product = products.find((p) => p.id === item.productId);
      const price = product?.price ?? 0;
      const lineTotal =  item.quantity * price;
      return {
        ...item,
        name : product?.name ?? 'Товар не найден',
        price : price,
        imageUrl : product?.imageUrl ?? 'Картинка не найдена',
        lineTotal : lineTotal
      }
    })
  }
);

export const selectCartTotalPrice = createSelector(
  selectCartItemsWithDetails,
  (detailedItem) => detailedItem.reduce((total, item) => total + item.lineTotal, 0)
)
