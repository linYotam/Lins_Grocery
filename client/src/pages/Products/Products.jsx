import { useEffect, useState } from 'react';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import Filter from '../../components/Filter/Filter';
import { useDispatch } from 'react-redux';
import { updateFilterProducts } from '../../features/filterProducts/filterProductsSlice';
import { updateProducts } from '../../features/products/productsSlice';
import { updateCategories } from '../../features/categories/categoriesSlice';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import { loadCart } from '../../features/cart/cartSlice';

const Products = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get('https://localhost:7062/api/Categories')
      .then(response => {
        dispatch(updateCategories([...response.data]));
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
          return product;
        });
        dispatch(updateFilterProducts([...newData]));
        dispatch(updateProducts([...newData]));
        setLoading(false);

        const userId = 2;

        console.log('newData: ', newData);

        axios
          .get(`https://localhost:7062/api/Cart/${userId}`)
          .then(response => {
            const userCart = response.data;

            const cart = userCart.map(cartItem => {
              const { productId, quantity } = cartItem;
              const product = newData.find(item => item.id === productId);
              return { product, amount: quantity };
            });

            dispatch(loadCart(cart));
          })
          .catch(error => {
            console.error(error);
          });
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
