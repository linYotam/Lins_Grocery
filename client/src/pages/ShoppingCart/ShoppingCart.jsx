import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CartCard from "../../components/CartCard/CartCard";

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

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

const ShoppingCart = () => {
  const cartProducts = useSelector((state) => state.cart.items);

  return (
    <div className="cart">
      <Typography variant="h2" gutterBottom className="page-title">
        Shopping Cart
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Product</StyledTableCell>
              <StyledTableCell align="center">Quantity</StyledTableCell>
              <StyledTableCell align="center">Price ($)</StyledTableCell>
              <StyledTableCell align="center">Remove</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartProducts.map(({ product, amount }) => (
              <CartCard key={product.id} product={product} amount={amount} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ShoppingCart;
