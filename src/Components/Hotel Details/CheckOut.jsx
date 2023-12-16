import { useState } from "react";
import { Button, styled } from "@mui/material";
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import axios from "axios";

// component styles
const CheckOutBtn = styled(Button)`
  background-color: orangered;
  color: white;
  text-transform: capitalize;
  padding: 5px;
  border-radius: 5px;
  &:hover {
    background-color: red;
  }
`;

const CheckoutBtn = ({ total, hotelName }) => {
  // retriewing user details from userSlice
  const { currentUser } = useSelector((state) => state.user);
  const userName = currentUser.userDetails.name;
  const email = currentUser.userDetails.email;

  const navigate = useNavigate()
  // data sent to server to create orderId
  const intialData = {
    amount: total * 100,
    currency: "INR",
    receipt: Date.now().toString(),
  };
  // main function which calls razorPay window
  const handlePayment = async (e) => {
    try {
      // creating orderId 
      const response = await axios.post("/payment/create-checkout", intialData);
      const options = {
        key: "rzp_test_rw6Q39PW7qKf1t",
        amount: total * 100,
        currency: "INR",
        name: "Book Easy",
        description: hotelName,
        image:
          "https://drive.google.com/file/d/1DCy-ihsQXI0g1XdaUbMJ_CA6ox7rVEGI/view?usp=drive_link",
        order_id: response.data.id,
        // validating payment
        handler: async function (response) {
          const body = { ...response };
          const validate = await axios.post("/payment/validate", body);
          console.log(validate.data)
        },
        prefill: {
          name: userName,
          email: email,
          contact: "+919876543210",
        },
        theme: {
          color: "#fb5607",
        },
      };
      const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (response) {
          
          alert(response.error.description);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });
      rzp.open();
      e.preventDefault();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CheckOutBtn fullWidth onClick={handlePayment}>
      Continue Booking
    </CheckOutBtn>
  );
};

export default CheckoutBtn;
