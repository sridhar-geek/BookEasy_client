
import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const MapComponent = () => {
 const position = { lat: 17.3, lng: 83.6 };
  const [open, setOpen] = useState(false);

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
      <div style={{ height: "100vh", width: "100vh" }}>
        <Map zoom={9} center={position} >
        </Map>
      </div>
    </APIProvider>
  );
};

export default MapComponent;
