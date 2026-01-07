import { Icons } from "@/utils/iconPath";
import { CSSProperties, MouseEventHandler, ReactNode, useState } from "react";
import { Popover } from "react-tiny-popover";
import "./style.css";

const TableAction = ({
  isView,
  isDelete,
  isUpdate,
  onClickView,
  onClickUpdate,
  onClickDelete,
  children,
  disabled,
  displayIcon,
  style,
}: {
  isView?: boolean;
  isDelete?: boolean;
  isUpdate?: boolean;
  onClickView?: MouseEventHandler;
  onClickUpdate?: MouseEventHandler;
  onClickDelete?: MouseEventHandler;
  anchorElement?: boolean;
  children?: ReactNode;
  disabled?: boolean;
  displayIcon?: string;
  style?: CSSProperties;
  heading?: string;
}) => {
  // States
  const [isOpen, setIsOpen] = useState(false);

  // Functions
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="tableActionMainContainer"
      aria-disabled={disabled ? "true" : "false"}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <Popover
        isOpen={isOpen}
        clickOutsideCapture
        positions={["bottom", "right", "left", "top"]}
        padding={10}
        align="end"
        containerClassName="TableAction"
        onClickOutside={handleClick}
        content={
          <ul className="tableActionMenu" style={{ ...style }}>
            {/* {heading && <li className="tableActionMenuHeading">{heading}</li>} */}

            {isView && (
              <TableActionMenuItemRender
                icon={Icons.DETAIL_ACTION}
                name="View Detail"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onClickView) onClickView(e);
                }}
              />
            )}
            {isUpdate && (
              <TableActionMenuItemRender
                icon={Icons.UPDATE_ACTION}
                name="Update"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onClickUpdate) onClickUpdate(e);
                }}
              />
            )}
            {children}
            {isDelete && (
              <TableActionMenuItemRender
                icon={Icons.DELETE_ACTION}
                name="Delete"
                isDelete={isDelete}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onClickDelete) onClickDelete(e);
                }}
              />
            )}
          </ul>
        }
      >
        <div className="TableAction">
          <button
            className="tableActionIconMenuIcon clickable"
            onClick={handleClick}
          >
            <img
              src={displayIcon ? displayIcon : Icons.ACTION_ICON}
              alt="update icons table"
              className="tableActionMainIcon"
            />
          </button>
        </div>
      </Popover>
    </div>
  );
};

export default TableAction;

export const TableActionMenuItemRender = ({
  icon,
  name = "title",
  onClick,
  isDelete,
}: {
  icon?: string;
  name?: string;
  onClick?: MouseEventHandler;
  isDelete?: boolean;
}) => {
  return (
    <li
      className={`tableActionItem unselectable clickable ${
        isDelete ? "deleteHover" : ""
      }`}
      onClick={onClick}
    >
      <button className="tableActionItemIconContainer clickable">
        <img
          src={icon}
          alt="update icons table"
          className="tableActionItemIcon"
        />
      </button>
      <span className="tableActonItemText">{name}</span>
    </li>
  );
};
