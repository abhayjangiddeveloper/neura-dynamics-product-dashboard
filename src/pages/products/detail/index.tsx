import Header from "@/common/Header";
import { InfoCard } from "@/common/InfoCard";
import { InfoWrapper } from "@/common/InfoWrapper";
import { fetchProductDetail, toggleFavorite } from "@/redux/productSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { Icons } from "@/utils/iconPath";
import { MouseEvent, useEffect } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductDetailSkeleton from "./ProductDetailSkeleton";
import classes from "./style.module.css";

const ProductDetail = () => {
  // Hooks
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  // Global State
  const { productDetail, productDetailLoading } = useSelector(
    (state: RootState) => state.products
  );

  // Functions
  const handleFavorite = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    dispatch(toggleFavorite(Number(id)));
  };

  // Effects
  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetail(id));
    }
  }, [id, dispatch]);

  if (productDetailLoading) {
    return (
      <SkeletonTheme
        baseColor="var(--skeleton-base)"
        highlightColor="var(--skeleton-highlight)"
      >
        <ProductDetailSkeleton />
      </SkeletonTheme>
    );
  }

  return (
    <div className={classes.productDetail}>
      <Header title="Product Detail" showBackButton />

      <section className={classes.productInfo}>
        <div className={classes.mainSection}>
          <div className={classes.productImageBox}>
            <img
              src={productDetail?.image}
              alt={productDetail?.title}
              className={classes.productImage}
            />

            <button
              className={classes.favoriteIconBox}
              onClick={handleFavorite}
            >
              <img
                src={
                  productDetail?.favorite
                    ? Icons.HEART_FILLED
                    : Icons.HEART_OUTLINE
                }
                alt={productDetail?.favorite ? "filled heart" : "outline heart"}
                className={classes.heart}
              />
            </button>
          </div>

          <div className={classes.titleAndDescription}>
            <h2 className={classes.title}>{productDetail?.title}</h2>
            <p className={classes.description}>{productDetail?.description}</p>

            <InfoWrapper>
              <InfoCard title="Category" value={productDetail?.category} />
              <InfoCard title="Price" value={String(productDetail?.price)} />
              <InfoCard
                title="Rating"
                value={`${productDetail?.rating.rate}`}
              />
            </InfoWrapper>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
