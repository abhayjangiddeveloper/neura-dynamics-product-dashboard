import { HeadCell } from "@/common/DataTable/table.type";

const TableColumn: HeadCell[] = [
  {
    id: "id",
    label: "ID",
  },
  {
    id: "title",
    label: "Title",
  },
  {
    id: "price",
    label: "Price",
  },
  {
    id: "description",
    label: "Description",
  },
  {
    id: "category",
    label: "Category",
  },
  {
    id: "action",
    label: "action",
  },
] as const;

export default TableColumn;

export type TableColumnId = (typeof TableColumn)[number]["id"];
