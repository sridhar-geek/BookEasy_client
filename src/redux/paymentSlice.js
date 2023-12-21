/** Creating payment slice for storing payment failure details */

import { createSlice } from "@reduxjs/toolkit";

const initialState ={
   description: null,
   reason: null 
}

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setDescription: (state,action) => {
            state.description = action.payload;
        },
        setReason : (state, action) => {
            state.reason = action.payload;
        }
    }
})

export const {setDescription, setReason} = paymentSlice.actions;
export default paymentSlice.reducer