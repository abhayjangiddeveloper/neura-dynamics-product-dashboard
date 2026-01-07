import Modal from "@/common/Modal";
import "./style.css";
import Button from "@/common/Button";

const DeleteModal = ({
  onClose,
  isOpen,
  name,
  onDelete,
  loading,
}: {
  onClose: () => void;
  isOpen: boolean;
  name: string;
  onDelete: () => void;
  loading: boolean;
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} title="Delete Product">
      <div className="deleteBannerModal">
        <h6 className="deleteBannerHeading">
          Are you sure you want to delete{" "}
          <span className="deleteBannerName">{`"${name}"`}</span>?
        </h6>
        <p className="deleteBannerMessage">This action is irreversible!</p>

        <div className="buttonGroup">
          <Button variant={"tertiary"} onClick={onClose} size="medium">
            Cancel
          </Button>
          <Button
            variant="delete"
            onClick={onDelete}
            size="medium"
            isLoading={loading}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
