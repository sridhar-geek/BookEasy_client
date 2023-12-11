/**Renders Markers(Hotels) on Google map and cluster them together */

import { useState, useEffect, useRef } from "react";
import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import {Box, Paper, Typography, Rating, Button} from '@mui/material'

// import Hotels from "../assests/Api Data/All_hotels.json";
// imports from another files
import {GetApiData} from '../api/getHotels'
import {gettingDetails, getSingleHotelDetails, getDescription} from '../redux/SearchSlice'


export default function MapComponent() {
  // retriewing data from redux slices
  const { latitude, longitude } = useSelector((state) => state.details);
  const { places } = useSelector((state) => state.hotels);
  // const places = Hotels.result;
  return (
    <div style={{ height: "90vh", width: "85vh" }}>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
        <Map
          zoom={10}
          center={{ lat: latitude, lng: longitude }}
          mapId={process.env.REACT_APP_MAPID}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          <Markers points={places} />
        </Map>
      </APIProvider>
    </div>
  );
}

// individual marker
const Markers = ({ points }) => {
  // retrewing data form redux slice 
   const { room_adults, arrivalDate, departureDate } = useSelector(
     (state) => state.details
   );
  const map = useMap();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [markers, setMarkers] = useState({});
  const clusterer = useRef(null);

    useEffect(() => {
      if (!map) return;
      if (!clusterer.current) {
        clusterer.current = new MarkerClusterer({ map });
      }
    }, [map]);

      useEffect(() => {
        clusterer.current?.clearMarkers();
        clusterer.current?.addMarkers(Object.values(markers));
      }, [markers]);

      const setMarkerRef = (marker, key) => {
        if (marker && markers[key]) return;
        if (!marker && !markers[key]) return;

        setMarkers((prev) => {
          if (marker) {
            return { ...prev, [key]: marker };
          } else {
            const newMarkers = { ...prev };
            delete newMarkers[key];
            return newMarkers;
          }
        });
      };

    //  const handleClick = async (hotelId) => {
    //    console.log("See availabilty button clicked");
    //    dispatch(gettingDetails());
    //    console.log("Loading Dispatch called");
    //    const data = await GetApiData(
    //      `/getHotelDetails?hotel_id=${hotelId}&arrival_date=${arrivalDate}&departure_date=${departureDate}&adults=${room_adults.adults}&room_qty=${room_adults.rooms}&currency_code=INR`
    //    );
    //    console.log("api for single hotel detail");
    //    dispatch(getSingleHotelDetails(data));
    //    console.log("single hotel dispatched");
    //    const desc = await GetApiData(
    //      `/getDescriptionAndInfo?hotel_id=${hotelId}`
    //    );
    //    console.log("description api called");
    //    dispatch(getDescription(desc));
    //    console.log("description is dispatched ");
    //    console.log("a call for navigation");
    //    navigate("/hotelDetails");
    //  };

  return (
    <>
      {points.map((point) => (
        <AdvancedMarker
          position={{ lat: point.latitude, lng: point.longitude }}
          key={point.hotel_id}
          ref={(marker) => setMarkerRef(marker, point.hotel_id)}
        >
          <Box
            height="100px"
            width="150px"
            display="flex"
            justifyContent="center"
            flexDirection="column"
          >
            <Paper elevation={6} square={false}>
              <img
                src={point.main_photo_url}
                style={{ height: "100px", width: "150px" }}
                alt="hotel"
              />
              <Box>
                {/* <Button onClick={handleClick(point.hotel_id)}> */}
                <Typography variant="body2" ml={1}>
                  {point.hotel_name}
                </Typography>
                {/* </Button> */}
                <Rating
                  defaultValue={Number(point.review_score / 2)}
                  size="small"
                  precision={0.5}
                  readOnly
                />
                <Typography variant="subtitle2" ml={1}>
                  {((point.min_total_price * 30) / 100).toFixed(0)}
                </Typography>
              </Box>
            </Paper>
          </Box>
        </AdvancedMarker>
      ))}
    </>
  );
};
