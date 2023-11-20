/** This is common header for all the pages */

import { AppBar, Box, Toolbar, styled } from "@mui/material";
import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState, useEffect } from "react";
import {setKey, fromLatLng} from 'react-geocode'
import Logo from "../../assests/Hotel_logo.jpeg";
/*Import modules from other files  */
import LoginSignup from "./LoginBtn";

//component styles
const RightContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-right: 5%;
`;
const Wrapper = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;
const LocationBox = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
`;
const Image = styled("img")`
  height: 45px;
  width: 70px;
  user-select: none;
`;

// var geocoder = new google.maps.Geocoder();

const Header = () => {
  //   const [latitude, setLatitude] = useState('')
  //   const [longitude, setLongitude] = useState('')

  //   const errorCallback = (error) => {
  //     console.log(error);
  //   };
  //   const successCallback = (position) => {
  //   console.log(position);
  // setLatitude(position.coords.latitude)
  // setLongitude(position.coords.longitude)
  // }
  //   navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

  // const coordinates = {lat:latitude, lng:longitude}
  //  setKey(process.env.REACT_APP_GOOGLE_API_KEY);
  //  const getAddress = async ()=>{
  //   try {
  //     const {response} = await fromLatLng(latitude, longitude)
  //     console.log(response)
  //     console.log(response[0].geometry.location)
      
  //   } catch (error) {
  //     console.error(error)
  //   }
  //  }
  //  getAddress()

  return (
    <AppBar elevation={1}>
      <Wrapper>
        <Link to={"/"}>
          <Image src={Logo} alt="logo" />
        </Link>
        <RightContainer>
          <LoginSignup />
          <LocationBox>
            <LocationOnIcon sx={{ marginLeft: "20px" }} />
            visakahpatnam
          </LocationBox>
        </RightContainer>
      </Wrapper>
    </AppBar>
  );
};

export default Header;
