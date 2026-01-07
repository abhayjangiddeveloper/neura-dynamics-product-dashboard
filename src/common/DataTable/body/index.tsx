import { TableRow } from "../table.type";
import { BodySkeleton } from "./BodySkeleton";
import "./style.css";

export const Body = ({
  rows,
  render,
  onClickRow,
  enableSelection,
  selectedRowsId,
  onChangeRowCheckbox,
  rowClassName,
  columns,
  loading,
}: {
  rows: TableRow[];
  render: (row: TableRow) => React.ReactNode;
  onClickRow?: (rowId: any) => void | null;
  enableSelection?: boolean;
  loading?: boolean;
  selectedRowsId?: number[];
  onChangeRowCheckbox?: (id: number) => void;
  rowClassName?: string;
  columns?: number;
}) => {
  // Variables
  if (loading) {
    return (
      <BodySkeleton
        rows={10}
        columns={columns}
        enableSelection={enableSelection}
      />
    );
  }

  return (
    <tbody className="body">
      {rows?.length !== 0 ? (
        rows?.map((row, idx) => (
          <tr
            key={`idx-table-${idx}`}
            onClick={(e) => {
              e.stopPropagation();
              if (onClickRow) onClickRow(row?.id);
            }}
            style={{
              cursor: onClickRow ? "pointer" : "default",
            }}
            className={rowClassName}
          >
            {enableSelection && (
              <td
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedRowsId?.includes(row?.id) ? true : false}
                  onChange={() => {
                    if (onChangeRowCheckbox) onChangeRowCheckbox(row?.id);
                  }}
                  id={String(row?.id)}
                />
              </td>
            )}
            {render(row)}
          </tr>
        ))
      ) : (
        <tr
          style={{
            textAlign: "center",
          }}
        >
          <td colSpan={1000}>No Record Found</td>
        </tr>
      )}
    </tbody>
  );
};
