import { apiCallerWithZustand } from "@/apiServices/apiCallerWithZustand";
import { API_END_POINTS } from "@/apiServices/apiEndPoints";
import { create } from "zustand";

export interface Rating {
  rate: number;
  count: number;
}

export interface ProductType {
  id: 1;
  title: string;
  price: number;
  description: string;
  category?: string;
  image: string;
  rating: Rating;
  favorite?: boolean;
}

interface FieldsStore {
  products: ProductType[];
  productDetail: ProductType | null;
  loading: boolean;
  productDetailLoading: boolean;
  error: string | null;

  fetchProducts: () => Promise<void>;
  fetchProductDetail: (id: string) => Promise<void>;

  addProductLocal: (product: ProductType) => void;
  deleteProductLocal: (id: number) => void;
  updateProductLocal: (id: number, updated: Partial<ProductType>) => void;

  reset: () => void;
}

const initialState = {
  products: [],
  productDetail: null,
  loading: false,
  productDetailLoading: false,
  error: null,
};

export const useProductStore = create<FieldsStore>((set) => ({
  ...initialState,

  fetchProducts: async () => {
    await apiCallerWithZustand<ProductType[]>({
      apiData: {
        url: API_END_POINTS.PRODUCTS,
        method: "GET",
      },
      apiFunc: (data) => set({ products: data }),
      setLoading: (v) => set({ loading: v }),
      setError: (v) => set({ error: v }),
    });
  },

  fetchProductDetail: async (id: string) => {
    await apiCallerWithZustand<ProductType>({
      apiData: {
        url: `${API_END_POINTS.PRODUCTS}/${id}`,
        method: "GET",
      },
      apiFunc: (data) => set({ productDetail: data }),
      setLoading: (v) => set({ productDetailLoading: v }),
      setError: (v) => set({ error: v }),
    });
  },

  addProductLocal: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),

  deleteProductLocal: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  updateProductLocal: (id, updated) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...updated } : p
      ),
    })),

  reset: () => set(initialState),
}));
