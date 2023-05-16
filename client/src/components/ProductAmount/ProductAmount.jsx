import { Add, Remove } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import React from "react";

const ProductAmount = ({ amount, setAmount }) => {
  const addAmount = () => {
    setAmount((prev) => prev + 1);
  };

  const removeAmount = () => {
    if (amount > 0) setAmount((prev) => prev - 1);
  };

  return (
    <div className="product__amount">
      {/* <Add className="add" onClick={addAmount} /> */}
      <IconButton aria-label="add to shopping cart" onClick={addAmount}>
        <Add
          sx={{
            color: "#61a48a",
          }}
        />
      </IconButton>
      <div className="product__amount__total">{amount}</div>
      <IconButton aria-label="add to shopping cart" onClick={removeAmount}>
        <Remove
          sx={{
            color: "#61a48a",
          }}
        />
      </IconButton>
      {/* <Remove className="remove" onClick={removeAmount} /> */}
    </div>
  );
};

export default ProductAmount;
