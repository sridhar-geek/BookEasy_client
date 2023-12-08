/** redux store for global data storage */

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

/*Import modules from other files  */
import userReducer from "../redux/userSlice";
import HotelReducer from "../redux/SearchSlice";
import DetailsReducer from "../redux/DetailsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  hotels: HotelReducer,
  details: DetailsReducer,
});
const persitsConfig = {
  key: "root",
  version: 1,
  storage,
};

const persitsReducer = persistReducer(persitsConfig, rootReducer);

export const Store = configureStore({
  reducer: persitsReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(Store);
