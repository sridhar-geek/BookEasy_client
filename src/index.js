import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import axios from 'axios'
    /*Import modules from other files  */
import { Store, persistor } from "./api/store";
import App from "./App";

   // this code made cookie to store in browser and send it along in every authorization request
// axios.defaults.withCredentials = true;  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);


// serverUrl =  https://book-easy-server.vercel.app/api

