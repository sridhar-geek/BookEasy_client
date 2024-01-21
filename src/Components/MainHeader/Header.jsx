/** This is common header for all the pages */

import { AppBar, Box, Toolbar, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";

/*Import modules from other files  */
import Logo from "../../assests/Hotel_logo.jpeg";
import LoginSignup from "./LoginBtn";
import { setPlace } from "../../redux/DetailsSlice";

//component styles
const RightContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-right: 5%;
`;
const LocationBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 30px;
`;
const Image = styled("img")`
  height: 45px;
  width: 70px;
  user-select: none;
`;

const Header = () => {

  const dispatch = useDispatch()
  const location = useLocation()

  // varaibles to store lat, lng
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

// retriewing data from details slice 
const {place} = useSelector((state)=> state.details)
    //error callback function
  const errorCallback = (error) => {
    console.error(error);
  };
  // success callback function
  const successCallback = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };
  //function to get lat and lng from browser
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

  // converts latitude and longitude into readble address
  useEffect(() => {
    if( '/' === location.pathname){
   const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        if (status === "OK") {
          dispatch(setPlace(results[9].formatted_address))
        } else {
          console.error("Geocode failed due to: " + status);
        }
      }
    );
    }
  }, [latitude, longitude, location.pathname]);

  return (
    <AppBar elevation={1}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between"}}>
        <Link to={"/"}>
          <Image src={Logo} alt="logo" />
        </Link>
        <RightContainer>
          <LoginSignup />
          <LocationBox>
            <LocationOnIcon sx={{ marginLeft: "20px" }} />
            <Typography>{place? place: 'Loading....'}</Typography>
          </LocationBox>
        </RightContainer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
