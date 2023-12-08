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
// Component styles
const WelcomeNote = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 100%;
  /* background: url("https://c4.wallpaperflare.com/wallpaper/849/275/712/resort-maui-hawaii-widescreen-free-download-1920%C3%971080-wallpaper-preview.jpg")
    no-repeat; */
  /* background-image: url("../assests/Website Main Image.jpg"); */
`;
const Font = styled(Typography)`
  font-family: Tourney;
`;

const Home = () => {
  return (
    <div>
      <Header />
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
        <Paper sx={{ padding: "25px", margin: "10px" }} elevation={6}>
          <SearchComponent />
        </Paper>
      </WelcomeNote>
    </div>
  );
};

export default Home;
