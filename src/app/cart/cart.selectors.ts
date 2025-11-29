import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromCart from "./cart.reducer";
import * as fromProducts from "../products/product.selectors"; // Должен экспортировать selectAllProducts
import * as fromProduct from "../products/product.reducer";
import { CartItemDetailed } from "./cart.model";

// --- Feature Selectors (Основа) ---

export const selectCartState = createFeatureSelector<fromCart.CartState>(fromCart.cartFeatureKey);
export const selectProductState = createFeatureSelector<fromProduct.ProductState>(fromProduct.productFeatureKey);

// --- Основные селекторы для корзины ---

// 1. Получает массив элементов корзины: [{ productId, quantity }]
export const selectorCartItems = createSelector(
  selectCartState,
  (state: fromCart.CartState) => state.items
);

// 2. Рассчитывает общее количество позиций в корзине
export const selectCartTotalItems = createSelector(
  selectCartState,
  (state) => state.items.reduce((total, item) => total + item.quantity, 0)
);

// 3. Составной селектор: Объединяет CartItem с полными данными Product
export const selectCartItemsWithDetails = createSelector(
  selectCartState,
  fromProducts.selectAllProducts, // <--- Предполагается, что возвращает Product[]
  (state, products): CartItemDetailed[] => {
    // 💡 Примечание: Лучше использовать словарь (Map) продуктов, если products.length > 100,
    // но для массива этот код корректен:
    if (!products || products.length === 0) return [];

    return state.items.map(item => {
      // Находим продукт по ID
      const product = products.find((p) => p.id === item.productId);
      const price = product?.price ?? 0;
      const lineTotal = item.quantity * price;

      return {
        ...item, // ID, quantity
        name: product?.name ?? 'Товар не найден',
        price: price,
        imageUrl: product?.imageUrl ?? 'Картинка не найдена',
        lineTotal: lineTotal
      }
    })
  }
);

// 4. Расчет общей стоимости
export const selectCartTotalPrice = createSelector(
  selectCartItemsWithDetails,
  (detailedItems) => detailedItems.reduce((total, item) => total + item.lineTotal, 0)
);

// --- Ненужные/некорректные селекторы удалены. ---

// import {createFeatureSelector, createSelector} from "@ngrx/store";
// import * as fromCart from "./cart.reducer";
// import * as fromProducts from "../products/product.selectors";
// import * as fromProduct from "../products/product.reducer";
// import { CartItemDetailed } from "./cart.model";
//
// export const selectCartState = createFeatureSelector<fromCart.CartState>(fromCart.cartFeatureKey);
// export const selectProductState = createFeatureSelector<fromProduct.ProductState>(fromProduct.productFeatureKey);
//
// export const selectorCartItems = createSelector(
//   selectCartState,
//   (state : fromCart.CartState) => state.items
// );
//
// // --- Ручные селекторы для данных корзины ---
//
// // Получает словарь { [id]: CartItem }
// export const selectCartEntities = createSelector(
//   selectCartState,
//   (state) => state.entities // <-- Ручное обращение к полю 'entities'
// );
//
// // Получает массив ID из корзины
// export const selectCartIds = createSelector(
//   selectCartState,
//   (state) => state.ids // <-- Ручное обращение к полю 'ids'
// );
//
// // Получает массив CartItem[]
// export const selectAllCartItems = createSelector(
//   selectCartIds,
//   selectCartEntities,
//   (ids, entities) => ids.map(id => entities[id]) as any // Преобразуем ID в массив объектов
// );
//
// // --- Ручной селектор для данных продуктов ---
//
// // Получает словарь { [id]: Product }
// export const selectProductEntities = createSelector(
//   selectProductState,
//   (state) => state.entities // <-- Ручное обращение к полю 'entities'
// );
//
//
// // 2. Составной селектор, объединяющий данные
// export const selectDetailedCartItems = createSelector(
//   selectAllCartItems,         // Используем ручной селектор, возвращающий массив CartItem
//   selectProductEntities,      // Используем ручной селектор, возвращающий словарь Product
//   (cartItems, productEntities) => {
//     return cartItems.map((cartItem: { id: string | number; quantity: number; }) => {
//       // Ищем полный объект продукта по ID
//       const product = productEntities[cartItem.id];
//
//       if (product) {
//         return {
//           ...product,
//           quantity: cartItem.quantity,
//           totalPrice: product.price * cartItem.quantity
//         };
//       }
//
//       // Заглушка, если продукт не найден
//       return {
//         id: cartItem.id,
//         name: 'Продукт не найден',
//         quantity: cartItem.quantity,
//         price: 0,
//         totalPrice: 0
//       };
//     });
//   }
// );
//
//
//
// export const selectCartTotalItems = createSelector(
//   selectCartState,
//   (state) => state.items.reduce((total, item) => total + item.quantity, 0)
// );
//
// export const selectCartItemsWithDetails = createSelector(
//   selectCartState,
//   fromProducts.selectAllProducts,
//   (state, products) : CartItemDetailed[] => {
//     if(!products || products.length === 0) return [];
//     return state.items.map(item => {
//       const product = products.find((p) => p.id === item.productId);
//       const price = product?.price ?? 0;
//       const lineTotal =  item.quantity * price;
//       return {
//         ...item,
//         name : product?.name ?? 'Товар не найден',
//         price : price,
//         imageUrl : product?.imageUrl ?? 'Картинка не найдена',
//         lineTotal : lineTotal
//       }
//     })
//   }
// );
//
// export const selectCartTotalPrice = createSelector(
//   selectCartItemsWithDetails,
//   (detailedItem) => detailedItem.reduce((total, item) => total + item.lineTotal, 0)
// )
