/** Home page  */

import React from "react";
import {
  Box,
  styled,
  Typography,
  Paper,
} from "@mui/material";

// import Banner_Image from "../assests/Website Main Image.jpg";
/* Import modules from another files */
import Header from "../Components/MainHeader/Header";
import SearchComponent from "../Components/SearchComponent";
import Banner from '../Components/Banner'
// Component styles
const WelcomeNote = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 100%;
  /* background: url("https://drive.google.com/uc?export=view&id=1LC3Dpiy5pBc7X9t6xnTgB1u7J2Av6cmm")
    no-repeat center; */
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;

const Home = () => {
  return (
    <div>
      <Header />
        <Banner />
      <WelcomeNote>
        <Typography
          variant="h1"
          color="orangered"
          style={{ fontFamily: "Tourney" }}
        >
          Book Easy
        </Typography>
        <Typography variant="h6" fontFamily="cursive">
          Book your next Stay here
        </Typography>
        <Paper sx={{ padding: "25px", margin: "10px" }}>
          <SearchComponent />
        </Paper>
      </WelcomeNote>
    </div>
  );
};

export default Home;
