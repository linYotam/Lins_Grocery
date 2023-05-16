import React from "react";
import { styled } from "@mui/material/styles";
import { Delete } from "@mui/icons-material";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import ProductAmount from "../ProductAmount/ProductAmount";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateCart, removeItem } from "../../features/cart/cartSlice";
import { Button, IconButton } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: "#c29e5b",
    // color: theme.palette.common.white,
    fontSize: "2rem",
    fontFamily: "Kanit",
    fontWeight: "600",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1.4rem",
    fontFamily: "Kanit",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CartCard = ({ product, amount: productCount }) => {
  const [amount, setAmount] = useState(productCount);
  const dispatch = useDispatch();

  const handleUpdateCart = () => {
    dispatch(updateCart({ product, amount }));
  };

  const removeProduct = () => {
    dispatch(removeItem({ product }));
  };

  return (
    <StyledTableRow key={product.name}>
      <StyledTableCell component="th" scope="row">
        <span className="cart-product">
          <img
            src={product.imageData}
            alt={product.title}
            className="cart-image"
          />
          <div className="cart-product-info">
            <span className="title">{product.title}</span>
            <span className="data">
              <strong>Price Per Unit:</strong> ${product.price}
            </span>
            <span className="data">
              <strong>Weight:</strong> {product.weight}
              {product.weightMsr}
            </span>
            <span className="data">
              <strong>Total Weight:</strong> {product.weight * productCount}
              {product.weightMsr}
            </span>
            <span className="data">
              <strong>Extra Info:</strong> {product.extra}
            </span>
          </div>
        </span>
      </StyledTableCell>
      <StyledTableCell className="info" align="center">
        <ProductAmount amount={amount} setAmount={setAmount} />
        <Button
          onClick={handleUpdateCart}
          className="update-amount--btn"
          component="span"
          variant="outlined"
          sx={{
            fontSize: "1.4rem",
            fontFamily: "Kanit",
            color: "#61a48a",
            borderColor: "#61a48a",
          }}
        >
          Update Cart
        </Button>
      </StyledTableCell>
      <StyledTableCell className="info" align="center">
        ${product.currentPrice * amount}
      </StyledTableCell>
      <StyledTableCell align="center">
        <IconButton
          aria-label="delete"
          sx={{ color: "#61a48a" }}
          size="large"
          onClick={removeProduct}
        >
          <Delete />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default CartCard;
