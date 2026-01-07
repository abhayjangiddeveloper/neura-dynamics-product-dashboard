import { MouseEventHandler } from "react";
import { Icons } from "../../../utils/iconPath";

export const SortingIcon = ({
  sortBy,
  onClick,
  id,
}: {
  sortBy: string;
  onClick?: MouseEventHandler;
  id: string | number | undefined;
}) => {
  // Functions
  const addClassName = () => {
    if (sortBy === "") {
      return Icons.ADD;
    } else if (sortBy === id || sortBy === `-${id}`) {
      if (sortBy.includes("-")) {
        return Icons.ADD;
      } else {
        return Icons.ADD;
      }
    }
  };

  return (
    <img
      src={addClassName()}
      alt="sorting icon"
      className="sortingIcon"
      onClick={onClick}
    />
  );
};
