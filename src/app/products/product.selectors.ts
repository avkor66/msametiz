import * as fromProducts from "./product.reducer";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const selectProductState = createFeatureSelector<fromProducts.ProductState>(fromProducts.productFeatureKey)

export const selectAllProducts = createSelector(
  selectProductState,
  (state: fromProducts.ProductState) => state.products
)

export const selectProductsLoading = createSelector(
  selectProductState,
  (state: fromProducts.ProductState) => state.loading
)

export const selectProductsError = createSelector(
  selectProductState,
  (state: fromProducts.ProductState) => state.error
)

export const selectProductById = (productId: string) => createSelector(
  selectProductState,
  (state: fromProducts.ProductState) => state.products.find(product => product.id === productId)
)