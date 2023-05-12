import {
  Add,
  BalanceOutlined,
  Calculate,
  CategoryOutlined,
  HiveOutlined,
  LocalFlorist,
  Remove,
  SellOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
// import axios from 'axios';
import { useSelector } from "react-redux";

const Card = ({ product }) => {
  const {
    imageData,
    description,
    price,
    categoryId,
    quantity,
    extra,
    weight,
    weightMsr,
    favorite,
    title,
    discount,
  } = product;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [imgError, setImgError] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);

  const categories = useSelector((state) => state.categories.value);

  useEffect(() => {
    categories.forEach((category) => {
      if (category.id === categoryId) setCategoryName(category.name);
    });
  }, [categories, categoryId]);

  useEffect(() => {
    if (discount === 0) setCurrentPrice(price);
    else setCurrentPrice((price - price * (discount / 100)).toFixed(2));
  }, [discount, price]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const addAmount = () => {
    setAmount((prev) => prev + 1);
  };

  const removeAmount = () => {
    if (amount > 0) setAmount((prev) => prev - 1);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleImageError = () => {
    setImgError(true);
  };

  return (
    <>
      <div className="product">
        <img
          // src={imgError ? '/images/no_image.jpg' : imageUrl}
          src={imageData || "/images/placeholder.png"}
          alt={description}
          onError={handleImageError}
          className="product__img"
        />

        <svg
          className={`product__like ${
            isFavorite ? "product__like--active" : ""
          }`}
          onClick={toggleFavorite}
        >
          <use xlinkHref="/images/sprite.svg#icon-heart-full" />
        </svg>

        {discount > 0 && (
          <div className="product__discount">Discount {discount}%</div>
        )}

        <h5 className="product__name" onClick={handleOpenModal}>
          {title}
        </h5>

        <div className="product__info__top">
          <SellOutlined className="product__icon" />
          {discount > 0 && (
            <p>
              <span className="product__erase_number">${price}</span> $
              {currentPrice}
            </p>
          )}
          {discount === 0 && <p>${currentPrice}</p>}
        </div>
        <div className="product__info__top">
          <CategoryOutlined className="product__icon" />
          <p>{categoryName}</p>
        </div>
        <div className="product__info">
          <HiveOutlined className="product__icon" />
          <p>{quantity} units</p>
        </div>
        <div className="product__info">
          <BalanceOutlined className="product__icon" />
          <p>
            {weight}
            {weightMsr}
          </p>
        </div>
        <div className="product__info">
          <LocalFlorist className="product__icon" />
          <p>{extra}</p>
        </div>
        <div className="product__info">
          <Calculate className="product__icon" />
          <p>${currentPrice * amount}</p>
        </div>

        <div className="product__amount">
          <Add className="add" onClick={addAmount} />
          <div className="product__amount__total">{amount}</div>
          <Remove className="remove" onClick={removeAmount} />
        </div>

        <button className="btn product__btn">
          <ShoppingCartOutlined className="product__btn__cart" />
          Add to cart
        </button>
      </div>

      {isModalOpen && (
        <Modal
          product={product}
          imageUrl={imgError ? "/images/no_image.jpg" : imageData}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

export default Card;
