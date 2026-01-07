import { apiCaller, ApiDataType } from "@/apiServices/apiCaller";
import { API_END_POINTS } from "@/apiServices/apiEndPoints";
import Button from "@/common/Button";
import { Dropdown } from "@/common/Dropdown";
import { Input } from "@/common/Input";
import Modal from "@/common/Modal";
import { Textarea } from "@/common/Textarea";
import { useProductStore } from "@/stores/productStore";
import { PRODUCT_CATEGORIES } from "@/utils/constant";
import { FormEvent, useEffect, useState } from "react";
import classes from "./style.module.css";

type FormErrors = {
  title?: string;
  description?: string;
  price?: string;
  category?: string;
  image?: string;
};

const CreateOrUpdateProductModal = ({
  onClose,
  isOpen,
  id,
}: {
  onClose: () => void;
  isOpen: boolean;
  id?: number;
}) => {
  const {
    productDetail,
    addProductLocal,
    updateProductLocal,
    fetchProductDetail,
  } = useProductStore();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (Number(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    } else if (!isValidUrl(formData.image)) {
      newErrors.image = "Enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const apiData: ApiDataType = {
      url: id ? `${API_END_POINTS.PRODUCTS}/${id}` : API_END_POINTS.PRODUCTS,
      method: id ? "PUT" : "POST",
      payload: {
        ...formData,
        price: Number(formData.price),
      },
    };

    try {
      const response = await apiCaller(apiData);
      if (id) {
        updateProductLocal(id, response);
      } else {
        addProductLocal(response);
      }
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    if (id) fetchProductDetail(String(id));
  }, [id, fetchProductDetail]);

  useEffect(() => {
    if (id && productDetail?.id)
      setFormData({
        category: productDetail.category,
        description: productDetail.description,
        image: productDetail.image,
        price: String(productDetail.price),
        title: productDetail.title,
      });
  }, [id, productDetail]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} title="Create Product">
      <form className={classes.createProduct} onSubmit={handleSubmit}>
        <div className={classes.textareaAndInput}>
          <div className={classes.inputGroup}>
            <Input
              label="Title"
              error={errors.title}
              inputProps={{
                placeholder: "Enter title",
                value: formData.title,
                onChange: (e) => handleChange("title", e.target.value),
              }}
            />

            <Input
              label="Price"
              error={errors.price}
              inputProps={{
                type: "number",
                placeholder: "Enter price",
                value: formData.price,
                onChange: (e) => handleChange("price", e.target.value),
              }}
            />

            <Dropdown
              error={errors.category}
              label="Category"
              data={PRODUCT_CATEGORIES}
              valueKey="key"
              displayKey="displayName"
              setSelectedValue={(value) => handleChange("category", value)}
              selectedValue={formData.category}
            />

            <Input
              label="Image"
              error={errors.image}
              inputProps={{
                placeholder: "Enter image URL",
                value: formData.image,
                onChange: (e) => handleChange("image", e.target.value),
              }}
            />
          </div>
          <Textarea
            error={errors.description}
            label="Description"
            textareaProps={{
              rows: 5,
              placeholder: "Enter description",
              value: formData.description,
              onChange: (e) => handleChange("description", e.target.value),
            }}
          />
        </div>

        <div className={classes.buttonGroup}>
          <Button
            variant="secondary"
            size="medium"
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button size="medium" type="submit" isLoading={loading}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateOrUpdateProductModal;
