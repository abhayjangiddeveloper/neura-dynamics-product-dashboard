import clsx from "clsx";
import { CSSProperties, FC, TextareaHTMLAttributes } from "react";
import classes from "./style.module.css";

export const Textarea: FC<{
  style?: CSSProperties;
  containerClassName?: string;
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
  label?: string;
  error?: string;
}> = ({ style, textareaProps, containerClassName, label, error }) => {
  return (
    <div className={classes.textareaWrapper}>
      <p className={classes.label}>{label}</p>

      <div
        className={clsx(
          classes.textareaContainer,
          containerClassName,
          error && classes.textareaError
        )}
        style={{ ...style }}
      >
        <textarea
          {...textareaProps}
          className={clsx(classes.coreInput, textareaProps?.className)}
        ></textarea>
      </div>

      {error && <p className={classes.error}>{error}</p>}
    </div>
  );
};
