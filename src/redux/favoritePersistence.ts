import { FAVORITE_KEY } from "@/utils/constant";
import { Middleware } from "@reduxjs/toolkit";
import {
  clearFavorites,
  fetchProducts,
  ProductType,
  toggleFavorite,
} from "./productSlice";

export const favoritePersistenceMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);

    if (toggleFavorite.match(action) || clearFavorites.match(action)) {
      const state = store.getState();
      const favoriteIds = state.products.products
        .filter((p: ProductType) => p.favorite)
        .map((p: ProductType) => p.id);

      localStorage.setItem(FAVORITE_KEY, JSON.stringify(favoriteIds));
    }

    if (fetchProducts.fulfilled.match(action)) {
      const stored = localStorage.getItem(FAVORITE_KEY);
      if (!stored) return result;

      const favoriteIds: number[] = JSON.parse(stored);
      const state = store.getState();

      state.products.products.forEach((product: ProductType) => {
        if (favoriteIds.includes(product.id)) {
          product.favorite = true;
        }
      });
    }

    return result;
  };
