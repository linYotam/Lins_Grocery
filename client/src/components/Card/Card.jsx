import {
  BalanceOutlined,
  Calculate,
  CategoryOutlined,
  HiveOutlined,
  LocalFlorist,
  SellOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../../reducers/cartSlice";
import ProductAmount from "../ProductAmount/ProductAmount";
import Cookies from "js-cookie";
import Message from "../Message/Message";
import Auth from "../Auth/Auth";

const Card = ({ product, productQuantity }) => {
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
  const [showMessage, setShowMessage] = useState(false);
  const [showSignWindow, setShowSignWindow] = useState(false);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.value);
  const user = Cookies.get("user");

  useEffect(() => {
    setAmount(productQuantity);
  }, [productQuantity]);

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

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleImageError = () => {
    setImgError(true);
  };

  const handleUpdateCart = () => {
    if (user !== undefined && user != null)
      dispatch(updateCart({ product, amount, userId: user.id }));
    else setShowMessage(true);
  };

  const closeSignPage = () => {
    setShowSignWindow(false);
  };

  const openSignPage = () => {
    setShowSignWindow(true);
  };

  return (
    <>
      <div className="product">
        <img
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
          // <div className="product__discount">Discount {discount}%</div>
          <div className="product__discount">
            <img
              className="product__discount-img"
              src="/images/sale.png"
              alt="sale"
            />
            <span className="product__discount-txt">SALE</span>
            <span className="product__discount-value">{discount}%</span>
          </div>
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
        <ProductAmount amount={amount} setAmount={setAmount} />
        <button className="btn product__btn" onClick={handleUpdateCart}>
          <ShoppingCartOutlined className="product__btn__cart" />
          Update cart
        </button>
      </div>

      {showMessage && (
        <Message
          handleCloseMessage={handleCloseMessage}
          openSignPage={openSignPage}
          title="Important Message"
          text="You need to register or log in to add items to your cart."
          type="warning"
        />
      )}

      {isModalOpen && (
        <Modal
          product={product}
          imageUrl={imgError ? "/images/no_image.jpg" : imageData}
          handleCloseModal={handleCloseModal}
        />
      )}

      {showSignWindow && <Auth closeSignPage={closeSignPage} />}
    </>
  );
};

export default Card;
