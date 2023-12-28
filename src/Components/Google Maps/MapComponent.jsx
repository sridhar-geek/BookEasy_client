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
import { useNavigate, Link } from "react-router-dom";
import { Box, Paper, Typography, Rating, Button } from "@mui/material";

// import Hotels from "../../assests/Api Data/All_hotels.json";
// imports from another files
import { GetApiData } from "../../api/getHotels";
import {
  gettingDetails,
  getSingleHotelDetails,
  getDescription,
} from "../../redux/SearchSlice";



export default function MapComponent() {
  // retriewing data from redux slices
  const { latitude, longitude } = useSelector((state) => state.details);
  const { places } = useSelector((state) => state.hotels);
  // const places = Hotels.result;
  return (
    <div style={{ height: "1000px", width: "1000px" }}>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
        <Map
          zoom={10}
          center={{ lat: latitude, lng: longitude }}
          mapId={process.env.REACT_APP_MAPID}
          disableDefaultUI={true}
        >
          <Markers hotels={places} />
        </Map>
      </APIProvider>
    </div>
  );
}

/* individual marker */
const Markers = ({ hotels }) => {
  // retrewing data form redux slice
  const { room_adults, arrivalDate, departureDate } = useSelector(
    (state) => state.details
  );
  const map = useMap();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [markers, setMarkers] = useState({});
  const clusterer = useRef(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) clusterer.current = new MarkerClusterer({ map });
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

  const handleClick = async (event) => {
    // Stop event propagation
    event.stopPropagation();
    // Prevent default behavior of the click event
    event.preventDefault();
    console.log("I am in handleclick function ");
    // Navigate to the hotel details page
    navigate(`/hotelDetails`);
  };

  return (
    <>
      {hotels.map((hotel) => (
        <AdvancedMarker
          position={{ lat: hotel.latitude, lng: hotel.longitude }}
          key={hotel.hotel_id}
          ref={(marker) => setMarkerRef(marker, hotel.hotel_id)}
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
                src={hotel.main_photo_url}
                style={{ height: "100px", width: "150px" }}
                alt="hotel"
              />
              <Box>
                {/* <Button onClick={(event) => handleClick(event)}> */}
                  <Link to={"/hotelDetails"} style={{ textDecoration: "none" }}>
                    <Typography variant="body2" ml={1}>
                      {hotel.hotel_name}
                    </Typography>
                  </Link>
                {/* </Button> */}
                <Rating
                  defaultValue={Number(hotel.review_score / 2)}
                  size="small"
                  precision={0.5}
                  readOnly
                />
                <Typography variant="subtitle2" ml={1}>
                  {((hotel.min_total_price * 30) / 100).toFixed(0)}
                </Typography>
              </Box>
            </Paper>
          </Box>
        </AdvancedMarker>
      ))}
    </>
  );
};

//  const handleClick = async (event, hotelId) => {
// event.preventDefault();
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



    //  gestureHandling={"greedy"}      used in map component allows double touch and some.................