import { Dropdown } from "@/common/Dropdown";
import Header from "@/common/Header";
import { Searchbar } from "@/common/Searchbar";
import { fetchProducts, reset } from "@/redux/productSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { PRODUCT_CATEGORIES, SORT_OPTIONS } from "@/utils/constant";
import { useDebounce } from "@uidotdev/usehooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./productCard";
import classes from "./style.module.css";
import ProductCardSkeleton from "./productCard/skeletonLoading";

const Products = () => {
  // Hooks
  const dispatch = useDispatch<AppDispatch>();

  // Global State
  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );

  // States
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string | null>(null);

  // Variables
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

  // Functions
  const handleFetchData = useCallback(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Effects
  useEffect(() => {
    handleFetchData();
    return () => {
      dispatch(reset());
    };
  }, [handleFetchData, dispatch]);

  return (
    <div className={classes.products}>
      <Header
        title="Products"
        // showButton
        // buttonTitle="Add product"
        // onButtonClick={handleOpenAddProductModal}
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

        {loading ? (
          <div className={classes.renderProducts}>
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
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
                favorite={product.favorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
