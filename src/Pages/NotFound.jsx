import React from "react";
import { Box, Typography, styled } from "@mui/material";

// import from another files
import Header from "../Components/MainHeader/Header";
import { Link } from "react-router-dom";

// component styles
const Container = styled(Box)`
  background: url("https://drive.google.com/uc?export=view&id=1bzFPHFVnU_FwFnSuDarGdljSDB5XxfcQ")
    no-repeat center;
  background-size: cover;
`;
const NotFound = () => {
  return (
    <div>
      <Header />
      <Container height="90vh" display="flex" justifyContent="center">
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
            </Link>{" "} to go back to Home page
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default NotFound;
