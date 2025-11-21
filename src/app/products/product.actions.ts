import {createAction, props} from "@ngrx/store";
import {Product} from "./product.model";

export const loadProduct = createAction(
  '[Product API] Load Products',
);

export const loadProductSuccess = createAction(
  '[Product API] Load Products Success',
  props<{ products: Product[] }>()
)

export const loadProductFailure = createAction(
  '[Product API] Load Products Failure',
  props<{ error: any }>()

)