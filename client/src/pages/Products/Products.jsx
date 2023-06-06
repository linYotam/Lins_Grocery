import { useEffect, useState } from "react";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import Filter from "../../components/Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import {
  fetchCategories,
  fetchProducts,
  fetchCart,
} from "../../actions/productsActions";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.products.value);
  const categories = useSelector((state) => state.categories.value);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  useEffect(() => {
    if (products.length !== 0) {
      setLoading(false);
    }
  }, [products]);

  useEffect(() => {
    if (token !== null && products !== null && products.length > 0) {
      dispatch(fetchCart({ token, products }));
    }
  }, [token, dispatch, products]);

  return (
    <div className="products">
      <Filter />
      {loading && <Loading />}
      {!loading && <FeaturedProducts />}
    </div>
  );
};

export default Products;
