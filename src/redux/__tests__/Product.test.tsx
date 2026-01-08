import { FAVORITE_KEY } from "@/utils/constant";
import { beforeEach, describe, expect, it, vi } from "vitest";
import reducer, {
  clearFavorites,
  fetchProductDetail,
  fetchProducts,
  reset,
  selectFavoriteProducts,
  toggleFavorite,
} from "../productSlice";

/* ---------------- MOCK API ---------------- */
vi.mock("@/apiServices/apiCaller", () => ({
  apiCaller: vi.fn(),
}));

/* ---------------- MOCK DATA ---------------- */
const mockProducts = [
  {
    id: 1,
    title: "Product 1",
    price: 100,
    description: "Desc 1",
    image: "img1",
    rating: { rate: 4, count: 10 },
  },
  {
    id: 2,
    title: "Product 2",
    price: 200,
    description: "Desc 2",
    image: "img2",
    rating: { rate: 5, count: 20 },
  },
];

const mockProductDetail = mockProducts[0];

describe("productSlice", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  /* ---------------- INITIAL STATE ---------------- */
  it("should return initial state", () => {
    const state = reducer(undefined, { type: "unknown" });

    expect(state).toEqual({
      products: [],
      productDetail: null,
      loading: false,
      productDetailLoading: false,
      error: null,
    });
  });

  /* ---------------- REDUCERS ---------------- */
  it("should toggle favorite in list and detail", () => {
    const state: any = {
      products: [{ ...mockProducts[0], favorite: false }],
      productDetail: { ...mockProducts[0], favorite: false },
      loading: false,
      productDetailLoading: false,
      error: null,
    };

    const newState = reducer(state, toggleFavorite(1));

    expect(newState.products[0].favorite).toBe(true);
    expect(newState?.productDetail?.favorite).toBe(true);
  });

  it("should clear all favorites", () => {
    const state: any = {
      products: mockProducts.map((p) => ({ ...p, favorite: true })),
      productDetail: { ...mockProducts[0], favorite: true },
      loading: false,
      productDetailLoading: false,
      error: null,
    };

    const newState = reducer(state, clearFavorites());

    expect(newState.products.every((p) => p.favorite === false)).toBe(true);
    expect(newState?.productDetail?.favorite).toBe(false);
  });

  it("should reset state", () => {
    const state: any = {
      products: mockProducts,
      productDetail: mockProductDetail,
      loading: true,
      productDetailLoading: true,
      error: "error",
    };

    const newState = reducer(state, reset());

    expect(newState).toEqual({
      products: [],
      productDetail: null,
      loading: false,
      productDetailLoading: false,
      error: null,
    });
  });

  /* ---------------- FETCH PRODUCTS ---------------- */
  it("should handle fetchProducts.pending", () => {
    const state = reducer(undefined, { type: fetchProducts.pending.type });

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("should handle fetchProducts.fulfilled and restore favorites", () => {
    localStorage.setItem(FAVORITE_KEY, JSON.stringify([1]));

    const state = reducer(undefined, {
      type: fetchProducts.fulfilled.type,
      payload: mockProducts,
    });

    expect(state.loading).toBe(false);
    expect(state.products[0].favorite).toBe(true);
    expect(state.products[1].favorite).toBe(false);
  });

  it("should handle fetchProducts.rejected", () => {
    const state = reducer(undefined, {
      type: fetchProducts.rejected.type,
      payload: "API Error",
    });

    expect(state.loading).toBe(false);
    expect(state.error).toBe("API Error");
  });

  /* ---------------- FETCH PRODUCT DETAIL ---------------- */
  it("should handle fetchProductDetail.pending", () => {
    const state = reducer(undefined, {
      type: fetchProductDetail.pending.type,
    });

    expect(state.productDetailLoading).toBe(true);
  });

  it("should handle fetchProductDetail.fulfilled with favorite restored", () => {
    localStorage.setItem(FAVORITE_KEY, JSON.stringify([1]));

    const state = reducer(undefined, {
      type: fetchProductDetail.fulfilled.type,
      payload: mockProductDetail,
    });

    expect(state.productDetailLoading).toBe(false);
    expect(state.productDetail?.favorite).toBe(true);
  });

  it("should handle fetchProductDetail.rejected", () => {
    const state = reducer(undefined, {
      type: fetchProductDetail.rejected.type,
      payload: "Detail Error",
    });

    expect(state.productDetailLoading).toBe(false);
    expect(state.error).toBe("Detail Error");
  });

  /* ---------------- SELECTOR ---------------- */
  it("should return only favorite products", () => {
    const state: any = {
      products: {
        products: [
          { ...mockProducts[0], favorite: true },
          { ...mockProducts[1], favorite: false },
        ],
      },
    };

    const favorites = selectFavoriteProducts(state);

    expect(favorites.length).toBe(1);
    expect(favorites[0].id).toBe(1);
  });
});
