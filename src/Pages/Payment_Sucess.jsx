import React from 'react'
import {Typography,Box} from '@mui/material'
import { Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
// Imports from another files
import Header from '../Components/MainHeader/Header'

const Payment_Sucess = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <Header />
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        bgcolor="#a8e6cf"
      >
        <Typography variant="h2" fontFamily="Lemonada" mb="40px">
          Hurry!!
        </Typography>
        <Typography variant="h2" fontFamily="Lemonada" mb="40px" ml="40px">
          {currentUser.userDetails.name} your Booking is Success{" "}
        </Typography>
        <Typography variant="h6" fontFamily="Ysabeau">
          Please Navigate to{" "}
          <Link
            to={"/profile"}
            style={{ textDecoration: "none", color: "red", fontWeight: "bold" }}
          >
            Profile page
          </Link>{" "}
          to See your booking
        </Typography>
      </Box>
    </div>
  );
}

export default Payment_Sucess