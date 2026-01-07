import { Icons } from "@/utils/iconPath";
import React, { useEffect, useRef, useState } from "react";
import { Body } from "./body";
import { Head } from "./head";
import { Pagination } from "./pagination";
import "./style.css";
import { DataTableProps } from "./table.type";

export const DataTable: React.FC<DataTableProps> = ({
  headCells,
  additionalHeadCells,
  rows,
  render,
  loading,
  handleChange,
  paginationEnabled,
  count = 0,
  limit = 0,
  setSortBy,
  sortBy,
  tableFooterTitle = "entries",
  onClickRow,
  enableSelection,
  setSelectedRowsId,
  selectedRowsId,
  selectionHeaderComponent,
  additionalHeadCellsRowClassName,
  headCellsRowClassName,
  rowClassName,
  currentPage,
  showSelectAllCheckbox = true,
  tableWrapperStyle,
  // setShowDataCount,
}) => {
  // Hooks
  const tableContainer = useRef<HTMLDivElement>(null);

  // Local States
  const [sortByValue, setSortByValue] = useState(sortBy || "");
  const [selectionHeaderVisibility, setSelectionHeaderVisibility] =
    useState(false);
  const [currentPageState, setCurrentPage] = useState<number>(
    Number(currentPage || 1)
  );
  const [selectAllCheckbox, setSelectAllCheckbox] = useState<boolean>(false);
  const [renderCheckbox, setRenderCheckbox] = useState(false);

  // Variables
  let tableTop: any;
  let elDistanceToTop: number = 100;

  if (tableContainer) {
    tableTop =
      tableContainer && tableContainer?.current?.getBoundingClientRect()?.top;

    if (tableTop) {
      elDistanceToTop = window?.scrollY + tableTop;
    }
  }

  // Functions
  const handleSelectAll = () => {
    if (selectAllCheckbox) {
      unselectAllRows();
    } else {
      selectAllRows();
    }
  };

  const unselectAllRows = () => {
    setSelectedRowsId([]);
    setSelectAllCheckbox(false);
  };

  const selectAllRows = () => {
    if (selectedRowsId) {
      const tempArray = selectedRowsId;

      rows?.map((item) => {
        if (!selectedRowsId?.includes(item?.id)) {
          tempArray?.push(item?.id);
        }
      });

      setSelectedRowsId(tempArray);
      setSelectAllCheckbox(true);
    }
  };

  const onChangeRowCheckbox = (id: number) => {
    if (selectedRowsId) {
      if (selectedRowsId?.includes(id)) {
        selectedRowsId?.splice(selectedRowsId?.indexOf(id), 1);
      } else {
        setSelectedRowsId([...selectedRowsId, id]);
      }
    }

    setSelectAllCheckbox(false);
    setRenderCheckbox(!renderCheckbox);
  };

  const handlePageChange = (pageNo: number) => {
    if (handleChange) handleChange(pageNo - 1);
    setCurrentPage(pageNo);
  };

  const generatePageNumbers = () => {
    const totalPages = Math.ceil(count / limit);
    const pageNumbers = [];
    const maxVisiblePages = 3;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPageState - halfVisible);
    let endPage = Math.min(totalPages, currentPageState + halfVisible);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
      endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    }

    if (startPage > 1) pageNumbers.push(1);
    if (startPage > 2) pageNumbers.push("...");

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages - 1) pageNumbers.push("...");
    if (endPage < totalPages) pageNumbers.push(totalPages);

    return pageNumbers;
  };

  // Effects
  useEffect(() => {
    if (setSortBy) {
      setSortBy(sortByValue);
    }
  }, [sortByValue, setSortBy]);

  useEffect(() => {
    if (selectedRowsId) {
      if (selectedRowsId?.length > 0) {
        setSelectionHeaderVisibility(true);
      } else {
        setSelectAllCheckbox(false);
        setTimeout(() => setSelectionHeaderVisibility(false), 300);
      }
    }
  }, [selectedRowsId, selectedRowsId?.length]);

  useEffect(() => {
    if (selectedRowsId) {
      setSelectedRowsId([]);
    }

    setSelectAllCheckbox(false);
  }, [currentPageState]);

  useEffect(() => {
    if (currentPage) {
      setCurrentPage(currentPage as number);
    }
  }, [currentPage]);

  // useEffect(() => {
  //   const container = mainTableContainerRef.current;

  //   const handleMouseDown = (event: MouseEvent) => {
  //     setIsDragging(true);
  //     setIsStopClickingRow(true);
  //     setStartX(event.pageX - (container?.offsetLeft || 0));
  //     setScrollLeft(container?.scrollLeft || 0);
  //   };

  //   const handleMouseMove = (event: MouseEvent) => {
  //     if (!isDragging) return;
  //     event.preventDefault();
  //     const x = event.pageX - (container?.offsetLeft || 0);
  //     const walk = (x - startX) * 1.5;
  //     if (container) {
  //       container.scrollLeft = scrollLeft - walk;
  //     }
  //   };

  //   const handleMouseUp = () => {
  //     setIsDragging(false);
  //     setTimeout(() => {
  //       setIsStopClickingRow(false);
  //     }, 150);
  //   };

  //   if (container) {
  //     container.addEventListener("mousedown", handleMouseDown);
  //     container.addEventListener("mousemove", handleMouseMove);
  //     container.addEventListener("mouseup", handleMouseUp);
  //     container.addEventListener("mouseleave", handleMouseUp);
  //   }

  //   return () => {
  //     if (container) {
  //       container.removeEventListener("mousedown", handleMouseDown);
  //       container.removeEventListener("mousemove", handleMouseMove);
  //       container.removeEventListener("mouseup", handleMouseUp);
  //       container.removeEventListener("mouseleave", handleMouseUp);
  //     }
  //   };
  // }, [isDragging, startX, scrollLeft]);

  return (
    <div className="dataTable" ref={tableContainer}>
      {selectionHeaderVisibility &&
        enableSelection &&
        showSelectAllCheckbox && (
          <div
            className={`rowsSelection animate__animated animate__faster 
          ${
            selectedRowsId && selectedRowsId?.length > 0
              ? "animate__fadeIn"
              : "animate__fadeOut"
          }
          `}
          >
            <p className="selectedRowsCount">
              {selectedRowsId?.length + " " + "Rows Selected"}{" "}
            </p>

            <div className="buttonsGroup">
              {selectionHeaderComponent}

              <div
                className="clearSelectionButton close clickable unselectable"
                onClick={unselectAllRows}
              >
                <img src={Icons.CLOSE} alt="close" />
              </div>
            </div>
          </div>
        )}

      <div
        className="tableWrapper"
        style={{
          minHeight: `calc(100dvh - ${elDistanceToTop}px - 7.5rem)`,
          ...tableWrapperStyle,
          position: "relative",
        }}

        // ref={mainTableContainerRef}
      >
        <table
          style={{
            borderCollapse: "collapse",
          }}
        >
          <Head
            headCells={headCells}
            additionalHeadCells={additionalHeadCells}
            enableSelection={
              rows?.length !== 0 && enableSelection ? true : false
            }
            selectAllCheckboxValue={
              selectAllCheckbox || rows?.length === selectedRowsId?.length
            }
            onChangeSelectAllCheckbox={handleSelectAll}
            setSortBy={setSortByValue}
            sortBy={sortByValue}
            additionalHeadCellsRowClassName={additionalHeadCellsRowClassName}
            headCellsRowClassName={headCellsRowClassName}
            showSelectAllCheckbox={showSelectAllCheckbox}
          />

          <Body
            rows={rows}
            render={render}
            onChangeRowCheckbox={onChangeRowCheckbox}
            selectedRowsId={selectedRowsId}
            enableSelection={enableSelection}
            // onClickRow={isStopClickingRow ? null : onClickRow}
            onClickRow={onClickRow}
            loading={loading}
            rowClassName={rowClassName}
            columns={headCells?.length}
          />
        </table>
      </div>

      {paginationEnabled && (
        <Pagination
          currentPage={currentPageState}
          generatePageNumbers={generatePageNumbers}
          handlePageChange={handlePageChange}
          setCurrentPage={setCurrentPage}
          count={count}
          limit={limit}
          tableFooterTitle={tableFooterTitle}
          // setShowDataCount={setShowDataCount}
        />
      )}
    </div>
  );
};
