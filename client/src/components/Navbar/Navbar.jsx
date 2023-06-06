import React, { useEffect, useState } from "react";
import {
  PersonOutlined,
  FavoriteBorderOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import SearchBtn from "../SearchBtn/SearchBtn";
import Auth from "../Auth/Auth";
import { useSelector } from "react-redux";

const Navbar = () => {
  const totalProducts = useSelector((state) => state.cart.totalCount);
  const user = useSelector((state) => state.auth.user);
  const [isSignOpen, setIsSignOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0 && !isFixed) {
        setIsFixed(true);
      } else if (scrollPosition === 0 && isFixed) {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFixed]);

  const navbarClassName = isFixed ? "navbar" : "navbar";

  const openSignPage = () => {
    setIsSignOpen(true);
  };

  const closeSignPage = () => {
    setIsSignOpen(false);
  };

  return (
    <>
      <div className={navbarClassName}>
        <div className="wrapper">
          <div className="left">
            <div className="item">
              <Link className="link" to="/">
                Home
              </Link>
            </div>
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
            {user !== undefined && user !== null && user.type === "admin" && (
              <div className="item">
                <Link className="link" to="/admin">
                  Admin
                </Link>
              </div>
            )}
          </div>
          <div className="center">
            <div className="item">
              <Link className="link" to="/">
                <img
                  src="/images/LinsGrocery_transparent.png"
                  alt=""
                  className="logo"
                />
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
      {isSignOpen && <Auth closeSignPage={closeSignPage} />}
    </>
  );
};

export default Navbar;
