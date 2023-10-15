import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    places: null,
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
    }
})

export const { gettingDetails, getHotelData } = HotelSlice.actions;

export default HotelSlice.reducer;