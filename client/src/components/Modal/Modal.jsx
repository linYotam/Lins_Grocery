import { CloseOutlined } from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";

const Modal = ({ product, handleCloseModal, imageUrl }) => {
  const query = product.name;
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const infoList = [
    ["Calories", ""],
    ["Total Fat", "g"],
    ["Saturated Fat", "g"],
    ["Protein", "g"],
    ["Sodium", "mg"],
    ["Potassium", "mg"],
    ["Cholesterol", "mg"],
    ["Total Carbohydrates", "g"],
    ["Fiber", "g"],
    ["Sugar", "g"],
  ];

  useEffect(() => {
    axios
      .get("https://api.api-ninjas.com/v1/nutrition?query=" + query, {
        headers: {
          "X-Api-Key": "Hc39plzepkcHh4nepbbvgg==MWFuSG7CP7ZzLXcG",
        },
      })
      .then(function (response) {
        const { name, serving_size_g, ...newData } = response.data[0];
        setInfo(newData);
        setLoading(false);
      })
      .catch(function (error) {
        console.error("Error:", error.response.data);
      });
  }, [query]);

  return (
    <div className="modal">
      <div className="modal__wrapper">
        <div className="modal__header">
          <div className="modal__header-title">{product.title}</div>
          <CloseOutlined
            className="modal__header-close"
            onClick={handleCloseModal}
          />
        </div>
        <div className="modal__content">
          <div className="modal__content-description">
            <p className="modal__content-description__head">Description</p>
            <p className="modal__content-description__body">
              {product.description}
            </p>
          </div>
          <img className="modal__content-image" src={imageUrl} alt="Product" />
        </div>
        <div className="modal__table-header">Nutrition Facts</div>

        <div>
          {loading ? (
            <Loading />
          ) : (
            <TableContainer component={Paper} style={{ height: 500 }}>
              <Table
                sx={{ minWidth: "80%" }}
                aria-label="simple table"
                className="table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>100g serving</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(info).map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {infoList[index][0]}
                      </TableCell>
                      <TableCell align="right">
                        {item[1]}
                        {infoList[index][1]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
