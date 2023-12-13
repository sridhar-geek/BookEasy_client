import {useState} from 'react'
import {Button, styled} from '@mui/material'
import axios from 'axios';

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
const CheckoutBtn = ({total, hotelName}) => {
const handlePayment = async()=> {
  
}
  return (
    <CheckOutBtn fullWidth
    onClick={handlePayment}>
        Continue Booking
    </CheckOutBtn>
  )
}

export default CheckoutBtn

