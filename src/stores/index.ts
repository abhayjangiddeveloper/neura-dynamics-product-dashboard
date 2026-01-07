// Imports
import { useProductStore } from "./productStore";

// Reset all stores
export const resetAllStores = () => {
  useProductStore.getState().reset();
};
