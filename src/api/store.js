import {configureStore } from '@reduxjs/toolkit'
import authReducer from '../Slice/auth'
import { apiSlice } from '../Slice/apiSlice'

const Store = configureStore({
    reducer:{
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})

export default Store