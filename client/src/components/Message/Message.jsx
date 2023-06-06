import { DisabledByDefault } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Message = ({ handleCloseMessage, openSignPage, title, text, type }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (type === "warning") {
      setShowButton(true);
    }
  }, [type]);

  const openSignWindow = () => {
    openSignPage();
    handleCloseMessage();
  };

  return (
    <div className="message">
      <div className="message__wrapper">
        <div className="message__header">
          <div className="message__header-title">{title}</div>
          <IconButton
            aria-label="exit"
            color="error"
            onClick={handleCloseMessage}
          >
            <DisabledByDefault
              className="message__header-btn"
              sx={{ fontSize: "3rem" }}
            />
          </IconButton>
        </div>
        <div className="message__body">{text}</div>
        <div className="message__footer">
          {showButton && (
            <Button
              variant="contained"
              color="success"
              sx={{ fontSize: "1.4rem", fontFamily: "Kanit" }}
              onClick={openSignWindow}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
