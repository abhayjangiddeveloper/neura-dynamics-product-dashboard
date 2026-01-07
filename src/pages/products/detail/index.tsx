import Header from "@/common/Header";
import { InfoCard } from "@/common/InfoCard";
import { InfoWrapper } from "@/common/InfoWrapper";
import { useProductStore } from "@/stores/productStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "./style.module.css";
import ProductDetailSkeleton from "./ProductDetailSkeleton";
import { SkeletonTheme } from "react-loading-skeleton";

const ProductDetail = () => {
  // Hooks
  const { productDetail, productDetailLoading, fetchProductDetail } =
    useProductStore();
  const params = useParams();

  // Variables
  const { id } = params;

  // Effects
  useEffect(() => {
    if (id) fetchProductDetail(id);
  }, [id, fetchProductDetail]);

  if (productDetailLoading)
    return (
      <SkeletonTheme
        baseColor="var(--skeleton-base)"
        highlightColor="var(--skeleton-highlight)"
      >
        <ProductDetailSkeleton />
      </SkeletonTheme>
    );

  return (
    <div className={classes.productDetail}>
      <Header title={"Product Detail"} showBackButton />

      <section className={classes.productInfo}>
        <div className={classes.mainSection}>
          <div className={classes.productImageBox}>
            <img
              src={productDetail?.image}
              alt={productDetail?.title}
              className={classes.productImage}
            />
          </div>

          <div className={classes.titleAndDescription}>
            <h2 className={classes.title}>{productDetail?.title}</h2>
            <p className={classes.description}>{productDetail?.description}</p>

            <InfoWrapper>
              <InfoCard title={"Category"} value={productDetail?.category} />
              <InfoCard title={"Price"} value={String(productDetail?.price)} />
              <InfoCard
                title={"Rating"}
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
