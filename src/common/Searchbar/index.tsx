import { CSSProperties, FC, InputHTMLAttributes } from "react";
import classes from "./style.module.css";
import clsx from "clsx";
import { Icons } from "@/utils/iconPath";

export const Searchbar: FC<{
  style?: CSSProperties;
  containerClassName?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}> = ({ style, inputProps, containerClassName }) => {
  return (
    <div
      className={clsx(classes.searchInputContainer, containerClassName)}
      style={{ ...style }}
    >
      <div className={classes.iconBox}>
        <img
          src={Icons.SEARCH}
          alt="search icon"
          className={classes.searchIcon}
        />
      </div>
      <input
        {...inputProps}
        type="search"
        className={clsx(classes.searchInput, inputProps?.className)}
      />
    </div>
  );
};
