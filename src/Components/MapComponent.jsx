
import { useState } from "react";
import {
  APIProvider,
  Map,
  Marker,
  AdvancedMarker,
  Pin,
 useAdvancedMarkerRef,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const MapComponent = () => {
  const position = { lat: 17.42, lng: 83.17 };

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
      <div style={{ height: "100vh", width: "100vh" }}>
        <Map zoom={9} center={position} mapId={process.env.REACT_APP_MAPID}>
          <AdvancedMarker position={position}>
            <h2 style={{ color: "white" }}>I am so customized</h2>
            <p style={{ color: "white" }}>That is pretty awesome!</p>
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
};

export default MapComponent;
