import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details : null,
  date : null,
  price : 0,
}

const DetailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    sotreDetails : (state, action)=> {
        state.details =action.payload
    },
    date: (state, action)=>{
      state.date = action.payload
    },
    price: (state, action)=>{
      state.price = action.payload
    }
  }  
})

export const {sotreDetails, date, price} = DetailsSlice.actions
export default DetailsSlice.reducer