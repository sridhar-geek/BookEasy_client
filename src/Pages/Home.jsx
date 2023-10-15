import React from "react";
import {
  Box,
  Grid,
  styled,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";

import Banner_Image from "../assests/Website Main Image.jpg";
import { cardAttraction, cardHotel } from "../assests/ImageUrl";
import Header from "../Components/HomePage/Header";
import SearchComponent from "../Components/SearchComponent";

const WelcomeNote = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 100%;
`;
const SearchBox = styled(Paper)`
  padding: 25px;
  margin: 10px;
`

const PaddingBox = styled(Box)`
  padding: 38px;
`;
const CardHover = styled(Card)`
  max-width: 400px;
  &:hover {
    transform: scaleY(1.1);
    box-shadow: 10px 10px 5px gray;
  }
`;

const Home = () => {
  return (
    <div>
      <Header />
      <WelcomeNote>
          <Typography variant="h1">Book Easy</Typography>
          <Typography>Book your next Stay here</Typography>
          <SearchBox elevation={6}>
          <SearchComponent />
          </SearchBox>
      </WelcomeNote>
      <PaddingBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <Link to={"/hotels"} style={{ textDecoration: "none" }}>
              <CardHover>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="160"
                    image={cardHotel}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Show all Hotels in Visakhapatnam
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </CardHover>
            </Link>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Link to={"/attractions"} style={{ textDecoration: "none" }}>
              <CardHover>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={cardAttraction}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Show all Famous Tourists places in Visakhapatnam
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </CardHover>
            </Link>
          </Grid>
        </Grid>
      </PaddingBox>
    </div>
  );
};

export default Home;
