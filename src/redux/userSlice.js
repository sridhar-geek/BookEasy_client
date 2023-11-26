/** Creating user reducers for updating and acessing user's data from all over the app */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userActionStart: (state) => {
      state.loading = true;
    },
    userActionSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    userActionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    delete_Logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  userActionStart,
  userActionSuccess,
  userActionFailure,
  delete_Logout
} = userSlice.actions;

export default userSlice.reducer;

