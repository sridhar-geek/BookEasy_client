import React, { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  Autocomplete,} from "@react-google-maps/api";
import {  Box, styled } from "@mui/material";

// component styles
const Container = styled(Box)`
  width: 70vh;
  height: 70vh;
`;

const center = {lat: 17.4, lng: 84.2}

const Map = () => {
  // const center = useMemo(() => ({ lat: 43, lng: -80 }), []);
  return (
    <Container>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerStyle={{ width: "100%", height: "100%" }}
      ></GoogleMap>
    </Container>
  );
};

export default Map;
