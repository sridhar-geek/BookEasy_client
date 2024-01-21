// this page appears when user search routes other than provided

import React from "react";
import { Box, Typography, styled } from "@mui/material";

// import from another files
import Header from "../Components/MainHeader/Header";
import { Link } from "react-router-dom";
import PageNotFound from '../assests/pageNotFound.png'

// component styles
const Container = styled(Box)`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
display: flex;
justify-content: center;
height: 90vh;
`;
const NotFound = () => {
  return (
    <div>
      <Header />
      <Container
        sx={{ backgroundImage: `url(${PageNotFound})` }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "50%",
          }}
        >
          <Typography variant="h5" fontFamily="Ysabeau">
            Please{" "}
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
                color: "red",
                fontWeight: "bold",
              }}
            >
              Click here
            </Link>{" "}
            to go back to Home page
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default NotFound;
