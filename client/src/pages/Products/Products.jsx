import { useEffect, useState } from 'react';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import Filter from '../../components/Filter/Filter';
import { useDispatch } from 'react-redux';
import { updateFilterProducts } from '../../features/filterProducts/filterProductsSlice';
import { updateProducts } from '../../features/products/productsSlice';
import { updateCategories } from '../../features/categories/categoriesSlice';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';

const Products = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log();
    axios
      .get('https://localhost:7062/api/Categories')
      .then(response => {
        dispatch(updateCategories([...response.data]));
        //console.log('Categories :', response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [dispatch]);

  useEffect(() => {
    axios
      .get('https://localhost:7062/api/Products')
      .then(response => {
        const newData = response.data.map(product => {
          product.imageData = `https://localhost:7062${product.imageData}`;
          //console.log(product.imageData);
          return product;
        });
        //console.log('Products: ', newData);
        dispatch(updateFilterProducts([...newData]));
        dispatch(updateProducts([...newData]));
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, [dispatch]);

  return (
    <div className="products">
      <Filter />
      {loading && <Loading />}
      {!loading && <FeaturedProducts />}
    </div>
  );
};

export default Products;
