
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
import {Box} from '@mui/material'
import {useNavigate} from 'react-router-dom'
const dummy = [
  {
    name: "sridhar",
    address: "maduthuru",
    latitude: 17.21,
    longitude: 84,
    img: "https://media-cdn.tripadvisor.com/media/photo-l/29/5b/ed/64/exterior.jpg",
  },
  {
    name: "sai Sowdha",
    address: "gajuwaka",
    latitude: 18.21,
    longitude: 83.17,
    img: "https://media-cdn.tripadvisor.com/media/photo-s/22/15/78/25/ginger-visakhapatnam.jpg",
  },
  {
    name: "saisri",
    address: "visakhapatnam",
    latitude: 17,
    longitude: 84,
    img: "https://media-cdn.tripadvisor.com/media/photo-s/26/c0/be/6d/facade.jpg",
  },
];
const MapComponent = () => {
  const position = { lat: 17.42, lng: 83.17 };
  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
      <div style={{ height: "100vh", width: "100vh" }}>
        <Map zoom={9} center={position} mapId={process.env.REACT_APP_MAPID}>
     <AdvancedMarker position={position} ></AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
};

export default MapComponent;
