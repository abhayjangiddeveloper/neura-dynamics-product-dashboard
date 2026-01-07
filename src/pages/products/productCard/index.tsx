import { Icons } from "@/utils/iconPath";
import classes from "./style.module.css";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { buildPath } from "@/utils/functions";
import { CURRENCY_SYMBOL, PATHS } from "@/utils/constant";
import { ProductType } from "@/redux/productSlice";

const ProductCard = ({
  image,
  title,
  description,
  rating,
  id,
  price,
}: ProductType) => {
  // Hooks
  const navigate = useNavigate();

  // Functions
  const navigateDetailPage = () => {
    navigate(
      buildPath({
        baseUrl: PATHS.PRODUCT_DETAIL,
        pathValues: {
          id,
        },
      })
    );
  };

  return (
    <div className={classes.productCard} onClick={navigateDetailPage}>
      <div className={classes.imageWrapper}>
        <img src={image} alt={title} className={classes.image} />

        <div className={classes.ratingAndFavorite}>
          <div className={classes.ratingBox}>
            <img src={Icons.STAR} alt="star" className={classes.starIcon} />
            <span className={classes.rating}>{rating.rate}</span>
          </div>

          {/* <button className={classes.favoriteIconBox}>
            <img
              src={Icons.HEART_OUTLINE}
              alt="heart"
              className={classes.heart}
            />
          </button> */}
        </div>
      </div>

      <div className={classes.content}>
        <div className={classes.priceAndLike}>
          <h2 className={clsx(classes.price, classes.textOverFlowTitle)}>
            {CURRENCY_SYMBOL}
            {price}
          </h2>

          <button className={classes.favoriteIconBox}>
            <img
              src={Icons.HEART_OUTLINE}
              alt="heart"
              className={classes.heart}
            />
          </button>
        </div>
        <h3 className={clsx(classes.title, classes.textOverFlowTitle)}>
          {title}
        </h3>
        <p className={clsx(classes.description, classes.textOverFlow)}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
