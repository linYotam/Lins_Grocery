import React, { useState } from "react";
import {
  PersonOutlined,
  FavoriteBorderOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import SearchBtn from "../SearchBtn/SearchBtn";
import Login from "../Login/Login";
import { useSelector } from "react-redux";

const Navbar = () => {
  const totalProducts = useSelector((state) => state.cart.totalCount);
  const [isSignOpen, setIsSignOpen] = useState(false);

  const openSignPage = () => {
    setIsSignOpen(true);
  };

  const closeSignPage = () => {
    setIsSignOpen(false);
  };

  return (
    <>
      <div className="navbar">
        <div className="wrapper">
          <div className="left">
            <div className="item">
              <Link className="link" to="/products">
                Browse
              </Link>
            </div>
            <div className="item">
              <Link className="link" to="/specials">
                Specials
              </Link>
            </div>
            <div className="item">
              <Link className="link" to="/recipes">
                Recipes
              </Link>
            </div>
            <div className="item">
              <Link className="link" to="/admin">
                Admin
              </Link>
            </div>
          </div>
          <div className="center">
            <div className="item">
              <Link className="link" to="/">
                <img src="/images/LinsGrocery.png" alt="" className="logo" />
              </Link>
            </div>
          </div>
          <div className="right">
            <div className="icons">
              <SearchBtn />
              <PersonOutlined className="icon" onClick={openSignPage} />
              <FavoriteBorderOutlined className="icon" />
              <Link to="/cart" className="link cartIcon">
                <ShoppingCartOutlined className="icon" />
                <span>{totalProducts}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {isSignOpen && <Login closeSignPage={closeSignPage} />}
    </>
  );
};

export default Navbar;
