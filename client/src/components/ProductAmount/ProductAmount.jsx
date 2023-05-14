import { Add, Remove } from "@mui/icons-material";
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
      <Add className="add" onClick={addAmount} />
      <div className="product__amount__total">{amount}</div>
      <Remove className="remove" onClick={removeAmount} />
    </div>
  );
};

export default ProductAmount;
