import { FC } from "react";
import classes from "./style.module.css";

const IconButton: FC<{
  icon: string;
  onClick?: () => void;
}> = ({ icon, onClick }) => {
  return (
    <div className={classes.iconButton} onClick={onClick}>
      <div className={classes.iconBox}>
        <img src={icon} alt={"action icon"} className={classes.icon} />
      </div>
    </div>
  );
};

export default IconButton;
