import { MouseEventHandler, CSSProperties, ReactNode } from "react";
import "./style.css";
import ButtonLoader from "../ButtonLoader";

interface ButtonProps {
  children: ReactNode;
  size?: "normal" | "medium" | "small";
  variant?: "primary" | "secondary" | "tertiary" | "delete";
  type?: "submit" | "reset" | "button" | undefined;
  containerStyle?: CSSProperties;
  onClick?: MouseEventHandler;
  className?: string;
  titleClassName?: string;
  isLoading?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  titleStyle?: CSSProperties;
}

const Button = ({
  children,
  containerStyle,
  onClick,
  className,
  titleClassName,
  isLoading,
  disabled,
  variant = "primary",
  type = "button",
  autoFocus,
  titleStyle,
  size = "normal",
}: ButtonProps) => {
  return (
    <div
      className={`commonButtonContainer ${variant}Button  ${size}Button unselectable clickable ${className}`}
      onClick={onClick}
      role="button"
      itemType="submit"
      aria-disabled={isLoading || disabled ? "true" : "false"}
      data-variant={variant}
      style={{
        ...containerStyle,
      }}
    >
      {isLoading && <ButtonLoader className={`buttonLoadingContainer`} />}
      <button
        name="button"
        type={type || "submit"}
        className={`commonButton ${titleClassName} ${
          isLoading ? "hideElement" : ""
        }`}
        disabled={disabled || isLoading}
        style={{
          ...titleStyle,
        }}
        autoFocus={autoFocus}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
