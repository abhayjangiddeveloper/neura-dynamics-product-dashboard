import { apiCaller, ApiDataType } from "@/apiServices/apiCaller";
import { API_END_POINTS } from "@/apiServices/apiEndPoints";
import TableAction from "@/common/TableAction";
import { ProductType, useProductStore } from "@/stores/productStore";
import { CURRENCY_SYMBOL, PATHS } from "@/utils/constant";
import { buildPath } from "@/utils/functions";
import clsx from "clsx";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateOrUpdateProductModal from "./createOrUpdateProduct";
import DeleteModal from "./deleteModal";
import classes from "./style.module.css";
import { TableColumnId } from "./tableColumn";

interface RenderCellsUiProps {
  row: ProductType;
  el: TableColumnId;
  deleteButtonLoading?: boolean;
}

const RenderCellsUi: FC<RenderCellsUiProps> = ({ row, el }) => {
  // Hooks
  const navigate = useNavigate();
  const { deleteProductLocal } = useProductStore();

  // States
  const [loading, setLoading] = useState(false);
  const [enableDeleteModal, setEnableDeleteModal] = useState(false);
  const [enableAddProductModal, setEnableAddProductModal] = useState(false);

  // Functions
  const handleDeleteModal = () => {
    setEnableDeleteModal(!enableDeleteModal);
  };

  const navigateDetailPage = () => {
    navigate(
      buildPath({
        baseUrl: PATHS.PRODUCT_DETAIL,
        pathValues: {
          id: String(row?.id),
        },
      })
    );
  };

  // const navigateUpdatePage = () => {
  //   navigate(
  //     buildPath({
  //       baseUrl: PATHS.UPDATE_PARTNER,
  //       pathValues: {
  //         id: String(row?.id),
  //       },
  //     })
  //   );
  // };

  const handleOpenAddProductModal = () => {
    setEnableAddProductModal((prev) => !prev);
  };

  const handleDelete = async (id?: number) => {
    setLoading(true);

    const apiData: ApiDataType = {
      url: `${API_END_POINTS.PRODUCTS}/${id}`,
      method: "DELETE",
    };

    try {
      const response: ProductType = await apiCaller(apiData);
      handleDeleteModal();
      deleteProductLocal(response.id);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ID
  if (el === "id") {
    return <td>{row?.id}</td>;
  }

  // Description
  else if (el === "description") {
    return (
      <td
        style={{
          width: "30rem",
          maxWidth: "30rem",
          overflow: "hidden",
        }}
      >
        <p className={classes.textOverFlow}>{row?.description}</p>
      </td>
    );
  }

  // Title
  else if (el === "title") {
    return (
      <td
        style={{
          width: "30rem",
          maxWidth: "30rem",
          overflow: "hidden",
        }}
      >
        <p className={clsx(classes.textOverFlow, classes.title)}>
          {row?.title}
        </p>
      </td>
    );
  }

  // Title
  else if (el === "price") {
    return <td>{`${CURRENCY_SYMBOL}${row?.price}`}</td>;
  }

  // Action
  else if (el === "action") {
    return (
      <td>
        {enableDeleteModal && (
          <DeleteModal
            loading={loading}
            onClose={handleDeleteModal}
            isOpen={enableDeleteModal}
            onDelete={() => handleDelete(row?.id)}
            name={row?.title}
          />
        )}

        {enableAddProductModal && (
          <CreateOrUpdateProductModal
            onClose={handleOpenAddProductModal}
            isOpen={enableAddProductModal}
            id={row?.id}
          />
        )}

        <TableAction
          anchorElement={enableDeleteModal || enableAddProductModal}
          isView
          isUpdate
          isDelete
          onClickView={navigateDetailPage}
          onClickUpdate={handleOpenAddProductModal}
          onClickDelete={handleDeleteModal}
        />
      </td>
    );
  }
  // Default
  else {
    return <td>{(el as string) in row ? (row as any)[el as string] : "-"}</td>;
  }
};

export default RenderCellsUi;
