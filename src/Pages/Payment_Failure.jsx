import React from "react";
import { styled, Box, Typography } from "@mui/material";
import {useSelector} from 'react-redux'
import { Link, useLocation } from "react-router-dom";

// Imports from another files
import Header from "../Components/MainHeader/Header";
//component styles
const Text = styled(Typography)`
  margin-top: 15px;
  font-weight: bold;
`
const Payment_Failure = () => {
  const {description, reason} = useSelector((state)=> state.payment)
  const { currentUser } = useSelector((state) => state.user);
   const location = useLocation();

  return (
    <div>
      <Header />
      <Box
        height="80vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Text>
          Sorry {currentUser.userDetails.name} your Payment was Failure !!!
        </Text>

        <Text>
          Reason for the payment failed:{" "}
          {reason ? reason : "Insufficient balance of your account"}
        </Text>

        <Text>
          Description of the payment:{" "}
          {description ? description : "Please check our balance and try again"}
        </Text>

        <Text>
          Please{" "}
          <Link
            to={location.state?.from || '/'}
            style={{ textDecoration: "none", color: "red", fontWeight: "bold" }}
          >
            Click here
          </Link>
          to try again{" "}
        </Text>
      </Box>
    </div>
  );
};

export default Payment_Failure;
