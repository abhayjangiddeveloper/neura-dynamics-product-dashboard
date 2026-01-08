import { ProductType, toggleFavorite } from "@/redux/productSlice";
import { useAppDispatch } from "@/redux/store";
import { CURRENCY_SYMBOL, PATHS } from "@/utils/constant";
import { buildPath } from "@/utils/functions";
import { Icons } from "@/utils/iconPath";
import clsx from "clsx";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./style.module.css";

const ProductCard = ({
  image,
  title,
  description,
  rating,
  id,
  price,
  favorite,
}: ProductType) => {
  // Hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  const handleFavorite = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    dispatch(toggleFavorite(id));
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
        </div>
      </div>

      <div className={classes.content}>
        <div className={classes.priceAndLike}>
          <h2 className={clsx(classes.price, classes.textOverFlowTitle)}>
            {CURRENCY_SYMBOL}
            {price}
          </h2>

          <button className={classes.favoriteIconBox} onClick={handleFavorite}>
            <img
              src={favorite ? Icons.HEART_FILLED : Icons.HEART_OUTLINE}
              alt={favorite ? "filled heart" : "outline heart"}
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
