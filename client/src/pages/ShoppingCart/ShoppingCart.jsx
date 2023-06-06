import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CartCard from "../../components/CartCard/CartCard";
import { ToastContainer } from "react-toastify";
// import CallToast from "../../components/Toaster/CallToaster";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: "#c29e5b",
    fontSize: "1.6rem",
    fontFamily: "Kanit",
    fontWeight: "600",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1.6rem",
    fontFamily: "Kanit",
  },
}));

const ShoppingCart = () => {
  const cartProducts = useSelector((state) => state.cart.items);

  const [totalWeight, setTotalWeight] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const calculateTotalWeight = (product) => {
    const item = product.product;
    const amount = parseInt(product.amount);

    if (item.weightMsr === "g" || item.weightMsr === "ml")
      return (item.weight / 1000) * amount;

    return item.weight * amount;
  };

  useEffect(() => {
    let weight = 0.0;
    let price = 0;
    let amountOfItems = 0;

    cartProducts.forEach((product) => {
      weight += parseFloat(calculateTotalWeight(product));
      price += parseFloat(product.product.currentPrice * product.amount);
      amountOfItems += product.amount;
    });
    setTotalWeight(weight);
    setTotalPrice(price);
    setTotalItems(amountOfItems);
    // CallToast("Cart updated", "success");
  }, [cartProducts]);

  return (
    <div className="cart">
      <Typography variant="h2" gutterBottom className="page-title">
        Shopping Cart
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: "70vh" }}>
        <Table
          sx={{ minWidth: 700 }}
          stickyHeader
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Product</StyledTableCell>
              <StyledTableCell align="center">Quantity</StyledTableCell>
              <StyledTableCell align="center">Price ($)</StyledTableCell>
              <StyledTableCell align="center">Remove</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartProducts.map(({ product, amount }) => {
              return (
                <CartCard key={product.id} product={product} amount={amount} />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="cart__sum">
        <div></div>
        <div className="cart__sum-info">
          <span>Total Items:</span> <span className="data">{totalItems}</span>
          <span>Total approx Weight:</span>
          <span className="data">{totalWeight}kg</span>
          <span>Products price:</span>
          <span className="data">${totalPrice.toFixed(2)}</span>
          <span>Delivery price:</span>
          <span className="data">$10</span>
          <span>Total price:</span>
          <span className="data">${(totalPrice + 10).toFixed(2)}</span>
          <Button
            className="order-btn"
            variant="contained"
            sx={{
              fontSize: "1.6rem",
              fontFamily: "Kanit",
              backgroundColor: "#61a48a",
            }}
          >
            Order Cart - ${(totalPrice + 10).toFixed(2)}
          </Button>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={50000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default ShoppingCart;
