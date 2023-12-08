/**Creating reducers for uploading and accessing Basic  details ex: rooms, adults, date, price  */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room_adults: null,
  arrivalDate:null,
  departureDate: null,
  price: 0,
  latitude: 17.34,
  longitude: 83.68,
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
    price: (state, action) => {
      state.price = action.payload;
    },
    setLatitude: (state, action) => {
      state.latitude = action.payload
    },
    setLongitude: (state, action) => {
      state.longitude = action.payload
    }
  },
});

export const { sotreDetails, price, startDate, endDate,setLatitude,setLongitude } = DetailsSlice.actions;
export default DetailsSlice.reducer;

