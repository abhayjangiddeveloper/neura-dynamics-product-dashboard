import { lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import "./index.css";
import Layout from "./layout/index.tsx";
import Dashboard from "./pages/dashboard/index.tsx";
import ProductDetail from "./pages/products/detail/index.tsx";
import Products from "./pages/products/index.tsx";
import { PATHS } from "./utils/constant.ts";

const Error = lazy(() => import("./pages/error/index.tsx"));

function ErrorBoundary() {
  const error = useRouteError();
  console.error("Route Error = ", error);
  return <Error />;
}

const Router = () => {
  const router = createBrowserRouter([
    {
      path: PATHS.ROOT,
      element: <Layout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: PATHS.ROOT,
          element: <Dashboard />,
        },
        {
          path: PATHS.PRODUCTS,
          element: <Products />,
        },
        {
          path: PATHS.PRODUCT_DETAIL,
          element: <ProductDetail />,
        },
        {
          path: PATHS.FAVORITES,
          element: <Products />,
        },
      ],
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
