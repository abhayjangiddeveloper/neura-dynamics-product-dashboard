import { describe, it, expect, beforeEach, vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { favoritePersistenceMiddleware } from "../favoritePersistence";
import reducer, { toggleFavorite, clearFavorites } from "../productSlice";
import { FAVORITE_KEY } from "@/utils/constant";

describe("favoritePersistenceMiddleware", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const setupStore = () =>
    configureStore({
      reducer: {
        products: reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(favoritePersistenceMiddleware),
    });

  it("should add product id to localStorage on toggleFavorite", () => {
    const store = setupStore();

    store.dispatch(toggleFavorite(1));

    const stored = JSON.parse(localStorage.getItem(FAVORITE_KEY) || "[]");

    expect(stored).toEqual([1]);
  });

  it("should remove product id from localStorage if already present", () => {
    localStorage.setItem(FAVORITE_KEY, JSON.stringify([1]));

    const store = setupStore();

    store.dispatch(toggleFavorite(1));

    const stored = JSON.parse(localStorage.getItem(FAVORITE_KEY) || "[]");

    expect(stored).toEqual([]);
  });

  it("should clear localStorage on clearFavorites", () => {
    localStorage.setItem(FAVORITE_KEY, JSON.stringify([1, 2]));

    const store = setupStore();

    store.dispatch(clearFavorites());

    expect(localStorage.getItem(FAVORITE_KEY)).toBeNull();
  });

  it("should ignore unrelated actions", () => {
    const store = setupStore();

    store.dispatch({ type: "UNKNOWN_ACTION" });

    expect(localStorage.getItem(FAVORITE_KEY)).toBeNull();
  });
});
