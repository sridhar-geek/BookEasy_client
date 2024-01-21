/**Creating reducers for uploading and accessing Basic  details ex: rooms, adults, date, price  */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room_adults: {rooms:1, adults:1, children:0},
  arrivalDate:null,
  departureDate: null,
  price: 0,
  photo:'',
  latitude: 17.69,
  longitude: 83.23,
  place:'',
  currencyCode:'INR',
  currencySymbol: '₹',
};

const DetailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    sotreDetails: (state, action) => {
      state.room_adults = action.payload;
    },
    startDate: (state, action) => {
      state.arrivalDate = action.payload;
    },
    endDate: (state, action) => {
      state.departureDate = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setPhoto: (state,action) => {
      state.photo = action.payload
    },
    setLatitude: (state, action) => {
      state.latitude = action.payload
    },
    setLongitude: (state, action) => {
      state.longitude = action.payload
    },
    setPlace: (state, action) => {
      state.place = action.payload
    },
    setCurrencyCode: (state,action)=>{
      state.currencyCode = action.payload
    },
    setCurrencySymbol: (state, action)=> {
      state.currencySymbol = action.payload
    },
  },
});

export const { sotreDetails, setPrice, setPhoto, startDate, endDate,setLatitude,setLongitude, setPlace, setCurrencyCode, setCurrencySymbol } = DetailsSlice.actions;
export default DetailsSlice.reducer;

