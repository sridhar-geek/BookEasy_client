import {configureStore,combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer,persistStore } from 'redux-persist'

    /**Import functions */
import userReducer from '../redux/userSlice'

const rootReducer =  combineReducers({user:userReducer})
const persitsConfig ={
    key: 'root',
    version: 1,
    storage,
}

const persitsReducer = persistReducer(persitsConfig, rootReducer);

export const Store = configureStore({
    reducer:
       persitsReducer,
    
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false})
})

export const persistor = persistStore(Store)