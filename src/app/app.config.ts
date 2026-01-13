import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authTokenInterceptor} from "./auth/auth.interceptor";
import {ActionReducer, provideState, provideStore} from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as fromCart from './cart/cart.reducer'
import * as fromProducts from './products/product.reducer'
import {localStorageSync} from "ngrx-store-localstorage";
import {ProductEffects} from "./products/product.effect";


const keysToSync = [fromCart.cartFeatureKey];

function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: keysToSync,
    rehydrate: true,
    storage: window.localStorage,
    removeOnUndefined: true
  })(reducer);
}

const metaReducers = [localStorageSyncReducer];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    provideStore({}, {metaReducers}),
    provideState(fromProducts.productFeatureKey, fromProducts.productReducer),
    provideState(fromCart.cartFeatureKey, fromCart.cartReducer),
    provideEffects([ProductEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
