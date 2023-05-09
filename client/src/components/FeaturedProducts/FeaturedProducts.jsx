import React from 'react';
import Card from '../Card/Card';
import { useSelector } from 'react-redux';

const FeaturedProducts = () => {
  const filterProducts = useSelector(state => state.filterProducts.value);

  const productsJSX = filterProducts.map(product => (
    <li key={product.id}>
      <Card product={product} />
    </li>
  ));

  return (
    <div>
      <ul className="featuredProducts">{productsJSX}</ul>
    </div>
  );
};

export default FeaturedProducts;
