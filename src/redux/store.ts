import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import products from "./productSlice";

// Combine all reducers
const rootReducer = combineReducers({
  products,
});

const rootReducerWithReset = (state: any, action: any) => {
  return rootReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducerWithReset,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
