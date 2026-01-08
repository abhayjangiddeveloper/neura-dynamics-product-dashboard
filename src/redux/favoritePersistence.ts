import { FAVORITE_KEY } from "@/utils/constant";
import { Middleware } from "@reduxjs/toolkit";
import { clearFavorites, toggleFavorite } from "./productSlice";

const getStoredFavoriteIds = (): number[] => {
  try {
    return JSON.parse(localStorage.getItem(FAVORITE_KEY) || "[]");
  } catch {
    return [];
  }
};

export const favoritePersistenceMiddleware: Middleware =
  () => (next) => (action) => {
    const result = next(action);

    if (toggleFavorite.match(action)) {
      const productId = action.payload;
      const stored = getStoredFavoriteIds();

      const updated = stored.includes(productId)
        ? stored.filter((id) => id !== productId)
        : [...stored, productId];

      localStorage.setItem(FAVORITE_KEY, JSON.stringify(updated));
    }

    if (clearFavorites.match(action)) {
      localStorage.removeItem(FAVORITE_KEY);
    }

    return result;
  };
