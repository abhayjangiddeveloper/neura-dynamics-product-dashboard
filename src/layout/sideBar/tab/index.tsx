import { Icons } from "@/utils/iconPath";
import clsx from "clsx";
import { CSSProperties, MouseEventHandler } from "react";
import classes from "./style.module.css";

export const Tab = ({
  icon,
  label,
  onClick,
  isActive,
  id,
  isNested,
  style,
  isOpen,
  isChildTab,
  count,
}: {
  icon?: string;
  label: string;
  onClick?: MouseEventHandler;
  isActive?: boolean;
  id?: string;
  isNested?: boolean;
  style?: CSSProperties;
  isOpen?: boolean;
  isChildTab?: boolean;
  count?: number;
}) => {
  return (
    <div
      className={clsx(classes.tab, {
        [classes.tabActive]: isActive,
        [classes.childTab]: isChildTab,
      })}
      onClick={onClick}
      id={id}
      style={{
        ...style,
      }}
    >
      <div className={classes.activeIndicator} />
      <div className={classes.labelAndIcon}>
        {icon && (
          <div className={classes.iconContainer}>
            <img className={classes.icon} src={icon} alt="tab icon" />
          </div>
        )}

        <p className={classes.name}>{label}</p>
      </div>

      {isNested && (
        <div className={classes.arrowIconBox}>
          <img
            src={Icons.ARROW}
            alt="right arrow"
            className={clsx(classes.nestedArrow, isOpen && classes.open)}
          />
        </div>
      )}

      {count && <div className={classes.count}>{count}</div>}
    </div>
  );
};
