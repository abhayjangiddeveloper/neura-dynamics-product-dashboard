export const PATHS = {
  ROOT: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/products/:id",
  FAVORITES: "/favorites",
};

export const CURRENCY_SYMBOL = "$";

export const PRODUCT_CATEGORIES = [
  {
    displayName: "Men's Clothing",
    key: "men's clothing",
  },
  {
    displayName: "Women's Clothing",
    key: "women's clothing",
  },
  {
    displayName: "Jewelery",
    key: "jewelery",
  },
  {
    displayName: "Electronics",
    key: "electronics",
  },
];

export const SORT_OPTIONS = [
  {
    label: "Price: Low → High",
    value: "lowToHigh",
  },
  {
    label: "Price: High → Low",
    value: "highToLow",
  },
];
