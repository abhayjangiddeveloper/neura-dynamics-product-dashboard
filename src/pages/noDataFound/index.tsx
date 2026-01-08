import { Icons } from "@/utils/iconPath";
import classes from "./style.module.css";

const NotFoundData = ({
  title = "No Products Found",
  description = "We couldn't find any products matching your criteria.",
}) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.icon}>
        <img src={Icons.CART} alt="cart" className={classes.iconImg} />
      </div>
      <h2 className={classes.title}>{title}</h2>
      <p className={classes.description}>{description}</p>
    </div>
  );
};

export default NotFoundData;
