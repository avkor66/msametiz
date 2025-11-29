import {Product} from "./product.model";
import {createReducer, on} from "@ngrx/store";
import * as ProductActions from "./product.actions";
import * as CartActions from "../cart/cart.actions"; // <-- Импортируем действия корзины

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

  // НОВАЯ ОБРАБОТКА: Добавляем продукт, созданный калькулятором
  on(CartActions.addConfiguredProductToCart, (state, { product }) => {
    // Проверяем, существует ли уже продукт с таким же ID (чтобы не дублировать)
    const exists = state.products.some(p => p.id === product.id);

    if (exists) {
      return state; // Не изменяем состояние, если продукт уже есть
    }

    // Если продукта нет, добавляем его в начало списка
    return {
      ...state,
      products: [product, ...state.products],
    };
  }),
)