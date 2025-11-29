import { createReducer, on } from '@ngrx/store';
import { addItem, clearCart } from './cart.act';
import { ICart } from '../../data/interfaces/product.interface';

// Интерфейс для состояния корзины
export interface CartState {
  items: ICart[];
  totalItems: number;
}

// Начальное состояние
export const initialCartState: CartState = {
  items: [],
  totalItems: 0,
};

// Редьюсер
export const cartRed = createReducer(
  initialCartState,

  // Логика добавления товара
  on(addItem, (state, { item }) => {
    // Создаем копию текущего массива items и добавляем новый товар
    const newItems = [...state.items, item];

    // Пересчитываем общее количество товаров
    const newTotalItems = newItems.reduce((total, cartItem) => total + (cartItem.quantity || 0), 0);

    return {
      ...state,
      items: newItems,
      totalItems: newTotalItems,
    };
  }),

  // Логика очистки корзины
  on(clearCart, (state) => ({
    ...state,
    items: [],
    totalItems: 0,
  }))
);