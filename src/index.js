import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

    /*Import modules from other files  */
import { Store, persistor } from "./api/store";
import App from "./App";

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


// "start": "react-scripts '--openssl-legacy-provider start",
  // "proxy": "https://book-easy-server.vercel.app/api"

    // useEffect(() => {
  //   if (!map) return;
  //   if (!clusterer.current) {
  //     clusterer.current = new MarkerClusterer({ map });
  //   } else {
  //     clusterer.current.setMaxDistance(50); // Set maximum distance
  //   }
  // }, [map]);
