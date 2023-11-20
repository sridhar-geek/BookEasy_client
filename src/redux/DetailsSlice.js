/**Creating reducers for uploading and accessing Basic  details ex: rooms, adults, date, price  */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room_adults: null,
  arrivalDate:null,
  departureDate: null,
  price: 0,
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
  },
});

export const { sotreDetails, price, startDate, endDate } = DetailsSlice.actions;
export default DetailsSlice.reducer;

