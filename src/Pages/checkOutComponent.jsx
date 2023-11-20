// import {useEffect, useState} from 'react'
// import { useSelector } from "react-redux";
// import {loadStripe} from '@stripe/stripe-js';
// import {
//   EmbeddedCheckoutProvider,
//   EmbeddedCheckout
// } from '@stripe/react-stripe-js';
// import axios from 'axios';

// // imports from another files
// import HotelData from '../Components/B_dummy data.json'
// import { Box } from '@mui/material';

// const stripePromise = loadStripe(
//   "pk_test_51O9mYASGJExsISoiV4miqEeH7vnJdQpxPY7qT2GkgfEOsB8o6sYFKfeAjH1tKMUuyj4b1pWxAhUZdZuVtkqjlZzP00mzsuMT1m"
// );


// const CheckOutComponent = () => {
//   const [clientSecret, setClientSecret] = useState('')
//   const { room_adults, date, price } = useSelector((state) => state.details);

// const data = HotelData.data[0]
// const checkOutData = {
//   name: data.name,
//   rooms: room_adults.rooms,
//   price: price
// }
// useEffect(()=>{
//   const checkOutRequest = async()=> {
//     const response = await axios.post('http://localhost:5000/api/checkout',checkOutData)
//     setClientSecret(response.id)
//   }
//   checkOutRequest()

// },[])

//   return (
//     <Box p='10px' margin='10px'>
//       {clientSecret && (
//         <EmbeddedCheckoutProvider
//           stripe={stripePromise}
//           options={{clientSecret}}
//         >
//           <EmbeddedCheckout />
//         </EmbeddedCheckoutProvider>
//       )}
//     </Box>  )
// }

// export default CheckOutComponent