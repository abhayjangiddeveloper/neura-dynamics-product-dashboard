import { apiCaller, ApiDataType } from "@/apiServices/apiCaller";
import { API_END_POINTS } from "@/apiServices/apiEndPoints";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
>(
  "products/fetchProducts",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    const apiData: ApiDataType = {
      url: API_END_POINTS.PRODUCTS,
      method: "GET",
    };

    try {
      const response = await apiCaller(apiData);
      return fulfillWithValue(response);
    } catch (err: any) {
      if (err) throw rejectWithValue(err);
    }
  }
);

export const fetchProductDetail = createAsyncThunk<
  ProductType,
  string,
  { rejectValue: string }
>(
  "products/fetchProductDetail",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    const apiData: ApiDataType = {
      url: `${API_END_POINTS.PRODUCTS}/${id}`,
      method: "GET",
    };

    try {
      const response = await apiCaller(apiData);
      return fulfillWithValue(response);
    } catch (err: any) {
      if (err) throw rejectWithValue(err);
    }
  }
);

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
        state.products = action.payload.map((product) => ({
          ...product,
          favorite: false,
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
        state.productDetail = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.productDetailLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const {
  addProductLocal,
  deleteProductLocal,
  updateProductLocal,
  reset,
  toggleFavorite,
  clearFavorites,
} = productSlice.actions;

export default productSlice.reducer;
