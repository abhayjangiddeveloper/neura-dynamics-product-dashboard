import classes from "./style.module.css";

const ProductCardSkeleton = () => {
  return (
    <div className={classes.productCard}>
      {/* Image Skeleton */}
      <div className={classes.imageWrapper}>
        <div className={classes.imageSkeleton} />

        <div className={classes.ratingAndFavorite}>
          <div className={classes.ratingBox}>
            <div className={classes.starSkeleton} />
            <div className={classes.ratingTextSkeleton} />
          </div>

          <div className={classes.favoriteIconBox} />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className={classes.content}>
        <div className={classes.priceAndLike}>
          <div className={classes.priceSkeleton} />
          <div className={classes.favoriteIconBox} />
        </div>

        <div className={classes.titleSkeleton} />
        <div className={classes.descSkeleton} />
        <div className={classes.descSkeletonSmall} />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
