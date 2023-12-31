/**Creating reducers for uploading and accessing Hotel details  */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    places: null,
    hotelDetails: null,
    description: [],
    loading: false,
}

const HotelSlice = createSlice({
    name: "hotels",
    initialState,
    reducers: {
        gettingDetails :(state) => {
            state.loading = true
        },
        getHotelData : (state, action) => {
            state.places = action.payload;
            state.loading = false
        },
        getSingleHotelDetails: (state, action) => {
            state.hotelDetails = action.payload;
            state.loading = false
        },
        getDescription: (state, action)=>{
            state.description = action.payload;
        },
        gettingDetailsFailure: (state)=> {
            state.loading = false
        }

    }
})

export const {
  gettingDetails,
  getHotelData,
  getSingleHotelDetails,
  getDescription,
  gettingDetailsFailure,
} = HotelSlice.actions;

export default HotelSlice.reducer;