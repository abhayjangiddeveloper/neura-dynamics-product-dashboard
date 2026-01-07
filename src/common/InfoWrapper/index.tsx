import { CSSProperties, FC, ReactNode } from "react";
import classes from "./style.module.css";

export const InfoWrapper: FC<{
  style?: CSSProperties;
  children?: ReactNode;
}> = ({ style, children }) => {
  return (
    <div className={classes.infoWrapper} style={{ ...style }}>
      <div className={classes.renderCard}>{children}</div>
    </div>
  );
};
