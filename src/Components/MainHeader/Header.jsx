/** This is common header for all the pages */

import { AppBar, Box, Toolbar, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState, useEffect } from "react";
import Logo from "../../assests/Hotel_logo.jpeg";

/*Import modules from other files  */
import LoginSignup from "./LoginBtn";

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
  // varaibles to store lat, lng and address
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");
  //   //error callback function
  // const errorCallback = (error) => {
  //   console.log(error);
  // };
  // // success callback function
  // const successCallback = (position) => {
  //   setLatitude(position.coords.latitude);
  //   setLongitude(position.coords.longitude);
  // };
  // //function to get lat and lng from browser
  // navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

  // // converts latitude and longitude into readble address
  // useEffect(() => {
  //   const geocoder = new window.google.maps.Geocoder();
  //   geocoder.geocode(
  //     { location: { lat: latitude, lng: longitude } },
  //     (results, status) => {
  //       if (status === "OK") {
  //         console.log(results)
  //         setAddress(results[9].formatted_address);
  //       } else {
  //         console.error("Geocode failed due to: " + status);
  //       }
  //     }
  //   );
  // }, [latitude, longitude]);

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
            <Typography>{address? address: 'Loading....'}</Typography>
          </LocationBox>
        </RightContainer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
