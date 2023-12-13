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
  const intialData = {
    amount: total,
    currency: 'INR',
    receipt: Date.now().toString()
  } 
const handlePayment = async()=> {
  try {
    const response = await axios.post("/create-checkout", intialData);
    const order = response.json()
    console.log(order)
  } catch (error) {
    console.error(error)
  }
}
  return (
    <CheckOutBtn fullWidth
    onClick={handlePayment}>
        Continue Booking
    </CheckOutBtn>
  )
}

export default CheckoutBtn

