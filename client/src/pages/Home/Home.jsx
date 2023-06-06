import { Pagination, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../actions/productsActions";
import { useState } from "react";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const saleProducts = useSelector((state) => state.saleProducts.value);
  const dispatch = useDispatch();

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    if (saleProducts.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, saleProducts]);

  useEffect(() => {
    let timer;

    if (saleProducts.length > 0) {
      timer = setInterval(() => {
        setCurrentPage((prevPage) =>
          prevPage === saleProducts.length ? 1 : prevPage + 1
        );
      }, 5000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [saleProducts.length]);

  return (
    <main className="home">
      <div className="home__upper-section">
        <div className="home__upper-section-info">
          Indulge in Culinary Excellence with the Finest Ingredients
        </div>
        {saleProducts.length > 0 && (
          <div className="home__upper-section-pagination">
            <Stack spacing={2}>
              <Typography className="home__upper-section-pagination-txt">
                Page: {currentPage}
              </Typography>
              <div className="discount__container">
                <img
                  className="discount__container-img"
                  src={saleProducts[currentPage - 1].imageData}
                  alt="sale"
                />
                <div className="discount__container-sale">
                  <img
                    className="discount__container-sale-img"
                    src="/images/sale.png"
                    alt="sale"
                  />

                  <span className="discount__container-sale-txt-up">SALE</span>
                  <span className="discount__container-sale-txt-bottom">
                    {saleProducts[currentPage - 1].discount}%
                  </span>
                </div>
              </div>
              <Pagination
                size="large"
                count={saleProducts.length}
                page={currentPage}
                onChange={handlePageChange}
              />
            </Stack>
          </div>
        )}
      </div>
      <div className="home__container">
        <div className="home__browse">
          <div className="home__browse-container">
            <span className="home__browse-text">
              <h1>Browse</h1>
            </span>
            <img
              className="home__browse-img"
              src="/images/browse.jpg"
              alt="browse"
            />
          </div>
        </div>

        <div className="home__specials">
          <div className="home__specials-container">
            <span className="home__specials-text">
              <h1>Specials</h1>
            </span>
            <img
              className="home__specials-img"
              src="/images/specials.jpg"
              alt="specials"
            />
          </div>
        </div>

        <div className="home__recipes">
          <div className="home__recipes-container">
            <span className="home__recipes-text">
              <h1>Recipes</h1>
            </span>
            <img
              className="home__recipes-img"
              src="/images/recipes.jpg"
              alt="recipes"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
