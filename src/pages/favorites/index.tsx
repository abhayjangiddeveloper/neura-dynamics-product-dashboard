import Header from "@/common/Header";
import {
  fetchProducts,
  reset,
  selectFavoriteProducts,
} from "@/redux/productSlice";
import type { AppDispatch } from "@/redux/store";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotFoundData from "../noDataFound";
import ProductCard from "../products/productCard";
import ProductCardSkeleton from "../products/productCard/skeletonLoading";
import classes from "./style.module.css";

const Favorites = () => {
  // Hooks
  const dispatch = useDispatch<AppDispatch>();

  // Global State
  const favoriteProducts = useSelector(selectFavoriteProducts);

  // States
  const [loading, setLoading] = useState(true);

  // Functions
  const handleFetchData = useCallback(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Effects
  useEffect(() => {
    handleFetchData();
    return () => {
      dispatch(reset());
    };
  }, [handleFetchData, dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className={classes.favorites}>
      <Header title="Favorites" />

      {loading ? (
        <div className={classes.renderProducts}>
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          {favoriteProducts.length === 0 ? (
            <NotFoundData />
          ) : (
            <div className={classes.renderProducts}>
              {favoriteProducts.map((product, index) => (
                <ProductCard
                  key={`favorite-${index}`}
                  image={product.image}
                  title={product.title}
                  description={product.description}
                  rating={product.rating}
                  id={product.id}
                  price={product.price}
                  favorite={product.favorite}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Favorites;
