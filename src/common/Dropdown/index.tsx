import { Icons } from "@/utils/iconPath";
import clsx from "clsx";
import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type DetailedHTMLProps,
  type HTMLAttributes,
} from "react";
import { Portal } from "../Portal";
import classes from "./style.module.css";

export interface DropdownProps {
  containerProps?: HTMLAttributes<HTMLDivElement>;
  buttonProps?: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  data: any;
  selectedValue?: any;
  setSelectedValue: (value: any) => void;
  displayKey: string;
  valueKey: string;
  isSearch?: boolean;
  isMultiple?: boolean;
  styleMenuContainer?: CSSProperties;
  styleValueAndMenuListContainer?: CSSProperties;
  menuContainerClassName?: string;
  compareKey?: string;
  label?: string;
  helperText?: string;
  error?: string;
  isOptional?: boolean;
  placeholder?: string;
  valueTextContainerProps?: HTMLAttributes<HTMLElement>;
  iconContainerProps?: HTMLAttributes<HTMLElement>;
}

export const Dropdown = ({
  containerProps,
  buttonProps,
  error,
  data,
  setSelectedValue,
  selectedValue,
  displayKey,
  valueKey,
  isMultiple,
  menuContainerClassName,
  styleValueAndMenuListContainer,
  compareKey,
  placeholder = "Select",
  valueTextContainerProps,
  label,
}: DropdownProps) => {
  //  Hooks
  const menuRef = useRef<HTMLUListElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Local States
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>("");
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  // Variables
  const Zero = 0;
  const selectFullItem = valueKey === "all";

  // Functions
  const selectedValueHandler = (value: any) => {
    if (isMultiple) {
      toggleItemSelection(value);
    } else {
      setSelectedValue(value);
      setIsOpen(false);
      setAnchor(null);
    }
  };

  const toggleItemSelection = (itemValue: any) => {
    const selectedIndex = selectedValue.indexOf(itemValue);
    const updatedSelection: any[] = [...selectedValue];
    if (selectedIndex !== -1) {
      updatedSelection.splice(selectedIndex, 1);
    } else {
      updatedSelection.push(itemValue);
    }
    setSelectedValue(updatedSelection);
  };

  const handleClick = (e: any) => {
    setAnchor(e.currentTarget);
    if (buttonProps?.disabled) {
      setIsOpen(false);
      setAnchor(null);
      return;
    }
    setIsOpen(!isOpen);
  };

  // Effects
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setAnchor(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!data) return;

    const foundKey = selectFullItem ? compareKey : valueKey;

    if (
      selectedValue === "" ||
      selectedValue === null ||
      selectedValue === undefined
    ) {
      setDisplayName("");
      return;
    }

    const found = data.find(
      (element: Record<string, any>) =>
        element?.[foundKey as string] === selectedValue
    );

    setDisplayName(found?.[displayKey] || "");
  }, [data, selectedValue, compareKey, displayKey, valueKey, selectFullItem]);

  useEffect(() => {
    if (isOpen) {
      const button = document.getElementById("customButton");
      if (button) button.style.position = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <div
        {...containerProps}
        className={clsx(classes.Dropdown, containerProps?.className)}
        style={{
          ...containerProps?.style,
          opacity:
            containerProps?.style?.opacity || (buttonProps?.disabled ? 0.5 : 1),
        }}
      >
        {label && <p className={classes.label}>{label}</p>}
        <div
          style={{
            position: "relative",
            ...styleValueAndMenuListContainer,
          }}
          ref={containerRef}
        >
          <button
            {...buttonProps}
            className={clsx(
              classes.field,
              classes.largeClickableElement,
              buttonProps?.className,
              error && classes.errorBorder
            )}
            onClick={handleClick}
            style={{
              ...buttonProps?.style,
            }}
            type={buttonProps?.type || "button"}
          >
            <p
              className={clsx(
                classes.valueText,
                valueTextContainerProps?.className,
                !selectFullItem &&
                  !selectedValue &&
                  placeholder &&
                  classes.placeholderText
              )}
            >
              {isMultiple && selectedValue?.length > 0
                ? `${selectedValue?.length} ${
                    selectedValue?.length > 1 ? "items" : "item"
                  } selected`
                : displayName || placeholder || "Select"}
            </p>

            {selectedValue ? (
              <div
                className={classes.closeIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedValue("");
                }}
              >
                <img
                  src={Icons.CLOSE}
                  alt="Dropdown Icon"
                  className={clsx(classes.close)}
                />
              </div>
            ) : (
              <div className={classes.iconBox}>
                <img
                  src={Icons.ARROW}
                  alt="Dropdown Icon"
                  className={clsx(classes.icon, isOpen && classes.openIcon)}
                />
              </div>
            )}
          </button>
        </div>
        {error && <p className={classes.error}>{error}</p>}
      </div>

      {isOpen ? (
        <Portal anchorEl={anchor} offset={8}>
          <ul
            className={clsx(
              classes.dropdownMenuContainer,
              menuContainerClassName
            )}
            ref={menuRef}
          >
            {data?.length <= Zero ? (
              <li className={classes.noDataFound}>
                <p>No Data Found</p>
              </li>
            ) : (
              <>
                {data?.map((item: Record<string, any>, index: number) => {
                  const isSelected = selectFullItem
                    ? selectedValue === item[compareKey as string]
                    : selectedValue === item[valueKey] && !isMultiple;

                  const dropdownClass = isSelected
                    ? classes.dropdownElementActive
                    : classes.dropdownElement;

                  return (
                    <li
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isMultiple) {
                          return;
                        } else {
                          selectedValueHandler(
                            selectFullItem ? item : item[valueKey]
                          );
                          setDisplayName(item[displayKey]);
                        }
                      }}
                      key={index}
                      className={`${classes.dropdownItem} unselectable ${dropdownClass}`}
                    >
                      {isMultiple && (
                        <input
                          type="checkbox"
                          checked={selectedValue?.includes(item[valueKey])}
                          onChange={() => selectedValueHandler(item[valueKey])}
                          onClick={(e) => e.stopPropagation()}
                        />
                      )}

                      {!isMultiple ? item[displayKey] : null}
                    </li>
                  );
                })}
              </>
            )}
          </ul>
        </Portal>
      ) : null}
    </>
  );
};
