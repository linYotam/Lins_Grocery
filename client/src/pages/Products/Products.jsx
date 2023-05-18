import { useEffect, useState } from 'react';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import Filter from '../../components/Filter/Filter';
import { useDispatch } from 'react-redux';
import { updateFilterProducts } from '../../reducers/filterProductsSlice';
import { updateProducts } from '../../reducers/productsSlice';
import { updateCategories } from '../../reducers/categoriesSlice';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import { loadCart } from '../../reducers/cartSlice';
import { useSelector } from 'react-redux';
import Auth from '../../components/Auth/Auth';

const Products = () => {
  const token = useSelector(state => state.auth.user);
  const [showAuthPage, setShowAuthPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token === undefined || token == null) setShowAuthPage(true);
    else setShowAuthPage(false);
  }, [token]);

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

        // console.log('newData: ', newData);

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
      {showAuthPage && <Auth />}
    </div>
  );
};

export default Products;
