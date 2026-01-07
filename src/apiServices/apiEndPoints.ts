export const API_BASE_URL = import.meta.env.VITE_BASE_URL || "/";

export const API_END_POINTS = (() => {
  const PRODUCTS = "/products";

  return {
    PRODUCTS,
  };
})();
