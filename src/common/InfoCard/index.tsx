import { CSSProperties, FC, HTMLAttributeAnchorTarget, ReactNode } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export const InfoCard: FC<{
  title?: string;
  value?: string;
  children?: ReactNode;
  additionalTitleAsChildren?: ReactNode;
  style?: CSSProperties;
  valueStyle?: CSSProperties;
  isBoolean?: boolean;
  booleanValue?: boolean;
  isLink?: boolean;
  linkValue?: string;
  link?: string;
  isTextWithLink?: boolean;
  linkTarget?: HTMLAttributeAnchorTarget;
}> = ({
  title,
  value,
  children,
  additionalTitleAsChildren,
  style,
  valueStyle,
  isBoolean,
  booleanValue,
  isLink,
  linkValue,
  link,
  isTextWithLink,
  linkTarget,
}) => {
  return (
    <div className="detailCard" style={{ ...style }}>
      <h6 className="description detailCardTitle" style={{ ...valueStyle }}>
        {title}
        {additionalTitleAsChildren}
      </h6>
      {!isBoolean && !isLink && !children && (
        <p className="description detailCardValue" style={{ ...valueStyle }}>
          {value ? value : "-"}{" "}
          {isTextWithLink && (
            <Link
              to={linkValue as string}
              target={linkTarget}
              className="description link"
              style={{ marginLeft: "0.75rem" }}
            >
              {linkValue}
            </Link>
          )}
        </p>
      )}
      {children && <span>{children}</span>}
      {isBoolean && (
        <span className="description boolean" style={{ ...valueStyle }}>
          {booleanValue ? "Yes" : "No"}
        </span>
      )}
      {isLink && (
        <Link
          to={link as string}
          target={linkTarget}
          className="description link"
          style={{ ...valueStyle }}
        >
          {linkValue ? linkValue : "-"}
        </Link>
      )}
    </div>
  );
};
