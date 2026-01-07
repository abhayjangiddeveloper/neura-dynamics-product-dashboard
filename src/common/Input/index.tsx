import clsx from "clsx";
import { CSSProperties, FC, InputHTMLAttributes } from "react";
import classes from "./style.module.css";

export const Input: FC<{
  style?: CSSProperties;
  containerClassName?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  label?: string;
  error?: string;
}> = ({ style, inputProps, containerClassName, label, error }) => {
  return (
    <div className={classes.inputWrapper}>
      <p className={classes.label}>{label}</p>

      <div
        className={clsx(
          classes.inputContainer,
          containerClassName,
          error && classes.inputError
        )}
        style={{ ...style }}
      >
        <input
          {...inputProps}
          className={clsx(classes.coreInput, inputProps?.className)}
        />
      </div>

      {error && <p className={classes.error}>{error}</p>}
    </div>
  );
};
