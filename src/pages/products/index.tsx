import { Dropdown } from "@/common/Dropdown";
import Header from "@/common/Header";
import { Searchbar } from "@/common/Searchbar";
import { useProductStore } from "@/stores/productStore";
import { PRODUCT_CATEGORIES, SORT_OPTIONS } from "@/utils/constant";
import { useDebounce } from "@uidotdev/usehooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./productCard";
import classes from "./style.module.css";
import TableColumn from "./tableColumn";

const Products = () => {
  // Store
  const { products, loading, fetchProducts, reset } = useProductStore();
  const navigate = useNavigate();

  // Local States
  const [enableAddProductModal, setEnableAddProductModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string | null>(null);

  // Variables
  const showData = TableColumn.map((el) => el.id);
  const debouncedQuery = useDebounce(searchText?.trim(), 500);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        !debouncedQuery ||
        product.title.toLowerCase().includes(debouncedQuery.toLowerCase());

      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (!sortOrder) return filtered;

    return [...filtered].sort((a, b) => {
      if (sortOrder === "lowToHigh") return a.price - b.price;
      if (sortOrder === "highToLow") return b.price - a.price;
      return 0;
    });
  }, [products, debouncedQuery, selectedCategory, sortOrder]);

  const handleOpenAddProductModal = () => {
    setEnableAddProductModal((prev) => !prev);
  };

  const handleFetchData = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Effects
  useEffect(() => {
    handleFetchData();
    return () => reset();
  }, [handleFetchData, reset]);

  return (
    <div className={classes.products}>
      <Header
        title="Products"
        showButton
        buttonTitle="Add product"
        onButtonClick={handleOpenAddProductModal}
      />

      <div className={classes.tableAndFilter}>
        <div className={classes.filterSection}>
          <Searchbar
            inputProps={{
              placeholder: "Search products (e.g. Jacket, Laptop)",
              onChange: (e) => setSearchText(e.target.value),
            }}
          />

          <Dropdown
            placeholder="Filter by category"
            setSelectedValue={(value) => setSelectedCategory(value || null)}
            data={PRODUCT_CATEGORIES}
            selectedValue={selectedCategory}
            valueKey="key"
            displayKey="displayName"
          />
          <Dropdown
            placeholder="Sort by price"
            setSelectedValue={(value) => setSortOrder(value || null)}
            data={SORT_OPTIONS}
            selectedValue={sortOrder}
            valueKey="value"
            displayKey="label"
          />
        </div>

        {/* <DataTable
          headCells={TableColumn}
          rows={filteredProducts as []}
          onClickRow={handleRowClick}
          loading={loading}
          render={(row: ProductType | TableRow): ReactNode =>
            showData.map((el, index) => (
              <RenderCellsUi
                key={`product-${index}`}
                row={row as ProductType}
                el={el as TableColumnId}
              />
            ))
          }
        /> */}

        <div className={classes.renderProducts}>
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={`product-${index}`}
              image={product.image}
              title={product.title}
              description={product.description}
              rating={product.rating}
              id={product.id}
              price={product.price}
              favorite={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
