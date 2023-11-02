import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoaded: false,
}

const DetailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    sotreDetails : (state, action)=> {
        state.isLoaded = action.payload
    }
  }  
})

export const {sotreDetails} = DetailsSlice.actions
export default DetailsSlice.reducer