import React from 'react';
import Card from '../Card/Card';
import { useSelector } from 'react-redux';

const FeaturedProducts = () => {
  const filterProducts = useSelector(state => state.filterProducts.value);
  const cart = useSelector(state => state.cart.items);
  console.log('cart: ', cart);
  const productsJSX = filterProducts.map(product => {
    const quantity = cart.find(item => item.product.id === product.id) || 0;
    const productQuantity = quantity.amount || 0;

    return (
      <li key={product.id}>
        <Card product={product} productQuantity={productQuantity} />
      </li>
    );
  });

  return (
    <div>
      <ul className="featuredProducts">{productsJSX}</ul>
    </div>
  );
};

export default FeaturedProducts;
