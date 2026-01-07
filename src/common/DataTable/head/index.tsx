import { ChangeEventHandler, CSSProperties } from "react";
import "./style.css";
import { SortingIcon } from "../sortingIcon";
import { AdditionalHeadCell, HeadCell } from "../table.type";

export const Head = ({
  headCells,
  additionalHeadCells,
  enableSelection,
  selectAllCheckboxValue,
  onChangeSelectAllCheckbox,
  setSortBy,
  sortBy,
  style,
  additionalHeadCellsRowClassName,
  headCellsRowClassName,
  showSelectAllCheckbox = true,
}: {
  headCells: HeadCell[];
  additionalHeadCells?: AdditionalHeadCell[];
  enableSelection?: boolean;
  selectAllCheckboxValue?: boolean;
  onChangeSelectAllCheckbox?: ChangeEventHandler<HTMLInputElement>;
  setSortBy?: (sortBy: string) => void;
  sortBy: string;
  style?: CSSProperties;
  additionalHeadCellsRowClassName?: string;
  headCellsRowClassName?: string;
  showSelectAllCheckbox?: boolean;
}) => {
  // Functions
  const sortChange = (data: HeadCell) => {
    if (data.enableSorting) {
      if (sortBy === "") {
        setSortBy?.(`-${data.sortKey}`);
      } else if (sortBy.includes("-")) {
        setSortBy?.(data.sortKey || "");
      } else {
        setSortBy?.("");
      }
    }
  };

  return (
    <thead className="head">
      {additionalHeadCells && additionalHeadCells?.length > 0 ? (
        <tr
          className={`additionalHeadCellsRow ${additionalHeadCellsRowClassName}`}
        >
          {additionalHeadCells?.map((additionalHeadCell) => (
            <th
              style={style}
              key={additionalHeadCell?.id}
              align={additionalHeadCell?.numeric ? "left" : "left"}
              colSpan={additionalHeadCell?.colSpan}
            >
              <div className="columnLabelAndSortingIcon">
                <p className="columnLabel" title={additionalHeadCell?.label}>
                  {additionalHeadCell?.label}
                </p>
              </div>
            </th>
          ))}
        </tr>
      ) : null}
      <tr className={headCellsRowClassName}>
        {enableSelection && (
          <th
            style={{
              opacity: showSelectAllCheckbox ? 1 : 0,
              pointerEvents: showSelectAllCheckbox ? "auto" : "none",
            }}
          >
            <input
              type="checkbox"
              checked={selectAllCheckboxValue}
              onChange={onChangeSelectAllCheckbox}
            />
          </th>
        )}
        {headCells?.map((headCell) => (
          <th
            style={style}
            key={headCell?.id}
            align={headCell?.numeric ? "left" : "left"}
            colSpan={headCell?.colSpan}
            onClick={() => {
              sortChange(headCell);
            }}
          >
            <div className="columnLabelAndSortingIcon">
              <p className="columnLabel" title={headCell?.label}>
                {headCell?.label}
              </p>
              {headCell?.enableSorting && (
                <SortingIcon id={headCell?.sortKey} sortBy={sortBy} />
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};
