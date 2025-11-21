import {Product} from "./product.model";
import {createReducer, on} from "@ngrx/store";
import * as ProductActions from "./product.actions";

export const productFeatureKey = 'products';

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: any | null;
}

export const initialState: ProductState = {
  products : [],
  loading : false,
  error : null
}

export const productReducer = createReducer(
  initialState,

  on(ProductActions.loadProduct, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(ProductActions.loadProductSuccess, (state, {products}) => ({
    ...state,
    products: products,
    loading: false,
    error: null
  })),

  on(ProductActions.loadProductFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error: error
  })),

)