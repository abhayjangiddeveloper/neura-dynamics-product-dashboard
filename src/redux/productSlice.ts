import { apiCaller, ApiDataType } from "@/apiServices/apiCaller";
import { API_END_POINTS } from "@/apiServices/apiEndPoints";
import { FAVORITE_KEY } from "@/utils/constant";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

const getStoredFavoriteIds = (): number[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(FAVORITE_KEY) || "[]");
  } catch {
    return [];
  }
};

export interface Rating {
  rate: number;
  count: number;
}

export interface ProductType {
  id: number;
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
}

const initialState: FieldsStore = {
  products: [],
  productDetail: null,
  loading: false,
  productDetailLoading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<
  ProductType[],
  void,
  { rejectValue: string }
>("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const apiData: ApiDataType = {
      url: API_END_POINTS.PRODUCTS,
      method: "GET",
    };

    const response = await apiCaller(apiData);
    return response;
  } catch (err: any) {
    return rejectWithValue(err);
  }
});

export const fetchProductDetail = createAsyncThunk<
  ProductType,
  string,
  { rejectValue: string }
>("products/fetchProductDetail", async (id, { rejectWithValue }) => {
  try {
    const apiData: ApiDataType = {
      url: `${API_END_POINTS.PRODUCTS}/${id}`,
      method: "GET",
    };

    const response = await apiCaller(apiData);
    return response;
  } catch (err: any) {
    return rejectWithValue(err);
  }
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProductLocal: (state, action: PayloadAction<ProductType>) => {
      state.products.push(action.payload);
    },

    deleteProductLocal: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },

    updateProductLocal: (
      state,
      action: PayloadAction<{ id: number; updated: Partial<ProductType> }>
    ) => {
      const { id, updated } = action.payload;
      state.products = state.products.map((p) =>
        p.id === id ? { ...p, ...updated } : p
      );
    },

    toggleFavorite: (state, action: PayloadAction<number>) => {
      const productId = action.payload;

      state.products = state.products.map((p) =>
        p.id === productId ? { ...p, favorite: !p.favorite } : p
      );

      if (state.productDetail?.id === productId) {
        state.productDetail.favorite = !state.productDetail.favorite;
      }
    },

    clearFavorites: (state) => {
      state.products = state.products.map((p) => ({
        ...p,
        favorite: false,
      }));

      if (state.productDetail) {
        state.productDetail.favorite = false;
      }
    },

    reset: () => initialState,
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;

        const favoriteIds = getStoredFavoriteIds(); // ✅ NEW

        state.products = action.payload.map((product) => ({
          ...product,
          favorite: favoriteIds.includes(product.id), // ✅ RESTORE LIKES
        }));
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(fetchProductDetail.pending, (state) => {
        state.productDetailLoading = true;
        state.error = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.productDetailLoading = false;

        const favoriteIds = getStoredFavoriteIds();

        state.productDetail = {
          ...action.payload,
          favorite: favoriteIds.includes(action.payload.id),
        };
      })

      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.productDetailLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const selectFavoriteProducts = (state: RootState) =>
  state.products.products.filter((p) => p.favorite);

export const {
  addProductLocal,
  deleteProductLocal,
  updateProductLocal,
  toggleFavorite,
  clearFavorites,
  reset,
} = productSlice.actions;

export default productSlice.reducer;
