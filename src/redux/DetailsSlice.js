import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details : null,
}

const DetailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    sotreDetails : (state, action)=> {
        state.details =action.payload
    }
  }  
})

export const {sotreDetails} = DetailsSlice.actions
export default DetailsSlice.reducer