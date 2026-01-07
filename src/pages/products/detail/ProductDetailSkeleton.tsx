import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import classes from "./style.module.css";

const ProductDetailSkeleton = () => {
  return (
    <div className={classes.productDetail}>
      {/* Header Skeleton */}
      <Skeleton height={40} width={260} />

      <section className={classes.productInfo}>
        <div className={classes.mainSection}>
          {/* Image Skeleton */}
          <div className={classes.productImageBox}>
            <Skeleton width="90%" height="90%" borderRadius="1.5rem" />
          </div>

          {/* Right Content */}
          <div className={classes.titleAndDescription}>
            {/* Title */}
            <Skeleton height={36} width="85%" />

            {/* Description */}
            <Skeleton count={3} height={16} />

            {/* Info Cards */}
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              <Skeleton height={70} width={160} borderRadius={12} />
              <Skeleton height={70} width={160} borderRadius={12} />
              <Skeleton height={70} width={160} borderRadius={12} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailSkeleton;
