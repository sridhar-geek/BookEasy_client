import React, { useState, useEffect } from "react";
import axios from "axios";


import Header from "../Components/MainHeader/Header";
import hotel from '../assests/Api Data/singleHotel.json'
const ProductDisplay = () => {

const formData = {
  // name : hotel.hotel_name,
  price : hotel.product_price_breakdown.gross_amount_hotel_currency.value,
}
  const handler  = async()=> {
    console.log('click me')
    const data = await axios.post("/create-checkout-session", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log('api called')
  }
  const handleWelcome = async()=> {
    try {
      console.log('Hey you clicked welcome route')
      await axios.get('/welcome')
    } catch (error) {
      console.error(error)
    }
  }
  console.log("Hey Im in checkout component")
  return (
  <>
    <Header />
    <div >
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div>
        <h3>Stubborn Attachments</h3>
        <h5>$20.00</h5>
      </div>
      <button onClick={(handleWelcome)}>Welcome </button>
      <button onClick={handler}>Checkout</button>
    </div>

  </>
  )
}

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function CheckOut() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    console.log('Hey Im in checkout page')
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? <Message message={message} /> : <ProductDisplay />;
}
