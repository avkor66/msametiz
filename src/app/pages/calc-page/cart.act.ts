import { createAction, props } from '@ngrx/store';
import { ICart } from '../../data/interfaces/product.interface';

// Действие для добавления нового товара в корзину
export const addItem = createAction(
  '[Cart] Add Item',
  props<{ item: ICart }>()
);

// Действие для очистки корзины
export const clearCart = createAction(
  '[Cart] Clear Cart'
);