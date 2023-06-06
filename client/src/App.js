import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Recipes from "./pages/Recipes/Recipes";
import Admin from "./pages/Admin/Admin";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import Specials from "./pages/Specials/Specials";

const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/recipes",
        element: <Recipes />,
      },
      {
        path: "/specials",
        element: <Specials />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/cart",
        element: <ShoppingCart />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
