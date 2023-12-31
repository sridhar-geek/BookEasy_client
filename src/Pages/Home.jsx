/** Home page  */

import React from "react";
import { Box, styled, Typography, Grid} from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/* Import modules from another files */
import Header from "../Components/MainHeader/Header";
import SearchComponent from "../Components/SearchComponent";
import {gettingDetails, getHotelData} from '../redux/SearchSlice'
import {startDate, endDate, sotreDetails, setLatitude, setLongitude} from '../redux/DetailsSlice'
import { GetApiData } from "../api/getHotels";
import Loader from "../Components/Loader";
import RainbowText from "../Components/RainBowText";
import { stopLoading } from "../redux/userSlice";
//images
import FooterImage from '../assests/HomePage/footerImage.jpg'
import DelhiImage from '../assests/HomePage/delhi.png'
import BenguluruImage from '../assests/HomePage/benguluru.png'
import GoaImage from '../assests/HomePage/Goa.png'
import MumbaiImage from '../assests/HomePage/Mumbai.png'
import VisakhapatnamImage from '../assests/HomePage/Visakhapatnam.png'

// Component styles
const WelcomeNote = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 100%;
  background: url("https://drive.google.com/uc?export=view&id=18RiT-S_1J_7hnOj5wDOPzsw3Yke4dwuO")
    no-repeat center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;
const Image = styled('img')`
  height: 250px;
  width: 400px;
  border-radius: 5%;
  cursor: pointer;
  :hover{
    transform: scale(1.02, 1.02);
  }
`
const BanguluruImage = styled('img')`
  height: 520px;
   width: 500px;
   cursor: pointer;
    border-radius: 5%;
    :hover{
      transform: scale(1.02,1.02);
    }
`;

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.hotels);
  // setting rooms, adults, arrivalDate, departureDate for calling API
  const state = {
    rooms: 1,
    adults: 1,
  };
  // Get today's date and formate date
  const today = new Date();
  const arrivalDate = today.toISOString().slice(0, 10);
  // Get the date 3 days from today and format date
  const dateAfter3Days = new Date(today.setDate(today.getDate() + 3));
  const departureDate = dateAfter3Days.toISOString().slice(0, 10);
  // search hotels based on selected city
  const handleClick = async (latitude, longitude) => {
    try {
      dispatch(gettingDetails());
      const data = await GetApiData(
        `/searchHotelsByCoordinates?latitude=${latitude}&longitude=${longitude}&arrival_date=${arrivalDate}&departure_date=${departureDate}&adults=${state.adults}&room_qty=${state.rooms}&currency_code=INR`
      );
      dispatch(getHotelData(data.result));
      dispatch(sotreDetails(state));
      dispatch(startDate(arrivalDate));
      dispatch(endDate(departureDate));
      dispatch(setLatitude(latitude))
      dispatch(setLongitude(longitude))
      navigate("/hotels");
    } catch (error) {
      dispatch(stopLoading())
      console.log(error)
    }
  };
  return (
    <div style={{ overflowX: "hidden" }}>
      <Header />
      <WelcomeNote>
        <Typography
          variant="h1"
          color="orangered"
          style={{ fontFamily: "Tourney" }}
        >
          Book Easy
        </Typography>
        <RainbowText text="book your next stay here" />
        {loading ? <Loader open={loading} /> : <SearchComponent />}
      </WelcomeNote>
      <Box margin="10px 3px 0px 3px" bgcolor="#EEF0E5" padding="10px">
        <Typography variant="h4" marginLeft='5%' fontWeight="bold" fontFamily="Poppins">
          Top destinations in India
        </Typography>
      </Box>
      <Grid container spacing={4} margin="0px 10px">
        <Grid item>
          <BanguluruImage
            src={BenguluruImage}
            alt="benguluru"
            onClick={() => handleClick(12.97, 77.59)}
          />
        </Grid>
        <Grid item container sm rowGap={2} columnGap={3}>
          <Grid item>
            <Image
              src={DelhiImage}
              alt="Delhi"
              onClick={() => handleClick(28.36, 77.13)}
            />
          </Grid>
          <Grid item>
            <Image
              src={VisakhapatnamImage}
              alt="Visakhapatnam"
              onClick={() => handleClick(17.68, 83.21)}
            />
          </Grid>
        </Grid>
        <Grid item container sm rowGap={2} columnGap={3}>
          <Grid item>
            <Image
              src={MumbaiImage}
              alt="Mumbai"
              onClick={() => handleClick(19.07, 72.87)}
            />
          </Grid>
          <Grid item>
            <Image
              src={GoaImage}
              alt="Goa"
              onClick={() => handleClick(15.3, 73.5)}
            />
          </Grid>
        </Grid>
      </Grid>
      <img
        src={FooterImage}
        alt="popualarity"
        style={{ height: "700px", width: "100%", margin: "0px 10px" }}
      />
    </div>
  );
};

export default Home;



