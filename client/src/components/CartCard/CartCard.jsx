import React from "react";
import { styled } from "@mui/material/styles";
import { DeleteForeverOutlined } from "@mui/icons-material";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import ProductAmount from "../ProductAmount/ProductAmount";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { updateCart } from "../../features/cart/cartSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#c29e5b",
    color: theme.palette.common.white,
    fontSize: "2rem",
    fontFamily: "Kanit",
    fontWeight: "600",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1.6rem",
    fontFamily: "Kanit",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CartCard = ({ product, amount: productCount }) => {
  const [amount, setAmount] = useState(productCount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateCart({ product, amount }));
  }, [product, amount, dispatch]);

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
      </StyledTableCell>
      <StyledTableCell className="info" align="center">
        ${product.currentPrice * amount}
      </StyledTableCell>
      <StyledTableCell align="center">
        <DeleteForeverOutlined className="remove" />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default CartCard;
