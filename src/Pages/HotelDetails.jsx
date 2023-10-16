import React from 'react'
import {useDispatch, useSelector} from 'react-redux'


const HotelDetails = () => {
  const singleHotel = useSelector((state) => state.hotels)
  // console.log(singleHotel.hotelDetails);

  return (
    <div>HotelDetails</div>
  )
}

export default HotelDetails