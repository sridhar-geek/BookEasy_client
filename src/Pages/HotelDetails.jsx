import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  styled,
  Grid,
  Chip,
  Stack,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

import HotelData from "../Components/B_dummy data.json";
import Header from "../Components/HomePage/Header";
import { HotelRoomImages } from "../assests/ImageUrl";
import ReviewComponent from "../Components/ReviewComponent";

const GoogleMap =()=> {
    const details = HotelData.data[0];
const lat = Number(details.latitude);
const lng = Number(details.longitude);

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
      <div style={{ height: "100%", width: "100%" }}>
        <Map
          zoom={12}
          center={{ lat, lng }}
          mapId={process.env.REACT_APP_MAPID}
        >
          <Marker position={{ lat, lng }} />

        </Map>
      </div>
    </APIProvider>
  );
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1200, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 150, min: 100 },
    items: 1,
  },
};

//componentStyles
const Image = styled("img")`
  display: flex;
  justify-content: center;
  height: 400px;
`;
const Container = styled(Box)`
  margin-left: 30px;
  padding: 30px;
  /* width: 70%; */
`;
const Title = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 70%;
`;
const NavBox = styled(Box)`
  display: flex;
  justify-content: space-around;
  background-color: #e2dcdc;
  width: 100%;
  position: sticky;
  top: 70px;
  border-radius: 10px;
`;
const NavItems = styled(Typography)``;
const RatingBox = styled(Box)`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #369136;
  margin: 2px solid black;
  font-size: 2.5rem;
  height: 90px;
  width: 110px;
  border-radius: 7px;
`;
const ReviewBox = styled(Box)`
  background-color: #7676c9;
  padding: 20px;
  border-radius: 15px;
  margin-top: 15px;
`;
// const Link = styled("a")`
//   text-decoration: none;
//   padding: 10px;
//   border-radius: 5px;
//   background-color: orangered;
//   color: white;
//   &:hover {
//     background-color: red;
//   }
// `;
const PriceBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  `;
const HotelDetails = () => {
  const singleHotel = useSelector((state) => state.hotels);
  const details = singleHotel.hotelDetails;

  console.log('details in Hotel Card'+ details)
  const loggedUser = useSelector((state) => state.user);
  const user = loggedUser.currentUser;
  const { room_adults, date, price } = useSelector((state) => state.details);

  console.log(date.startDate)
  const [showAll, setShowAll] = useState(false);
  const itemsToShow = showAll ? 20 : 10;

  const Navigate = useNavigate()
  const handleBooking =()=> {
    Navigate('/payment')
  }


  const gst = (price * 15) / 100;
  const discount = (price * 20) / 100;
  const total = price + gst - discount;

  date.startDate.setHours(0, 0, 0, 0);
  date.endDate.setHours(0, 0, 0, 0);
  let options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const checkIn = date.startDate.toLocaleDateString("en-US", options);
  const checkOut = date.endDate.toLocaleDateString("en-US", options);
    // const details = HotelData.data[0];
  return (
    <div>
      <Header />
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        ssr={true}
        infinite={true}
        keyBoardControl={true}
        transitionDuration={400}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {HotelRoomImages.map((img, index) => (
          <Image src={img.url} alt="Hotel" />
        ))}
      </Carousel>
      <Container>
        <Title>
          <Typography variant="h3">{details.name}</Typography>
          <RatingBox>
            {Number(details.rating).toFixed(1)} <StarIcon fontSize="large" />
          </RatingBox>
        </Title>
        <Typography variant="subtitle2" margin={2}>
          {details.address}
        </Typography>
        <NavBox>
          <NavItems>Overview</NavItems>
          <NavItems>Facilities</NavItems>
          <NavItems>Reviews</NavItems>
          <NavItems>Contact</NavItems>
          <NavItems>Locate Us</NavItems>
        </NavBox>
        <Grid container spacing={2}>
          <Grid item md={8} lg={8}>
            <Box>
              <Typography variant="h4" mt={4}>
                Overview
              </Typography>
              {details.description}
              {details.ranking && (
                <Typography mt={2} variant="h6">
                  Hotel Rank in the city : {details.ranking}
                </Typography>
              )}
            </Box>
            <Box>
              <Typography variant="h4" mt={4}>
                Amenities
              </Typography>
              {details.amenities?.slice(0, itemsToShow).map((item, i) => (
                <Chip
                  sx={{ padding: 2, margin: 1, userSelect: "none" }}
                  key={i}
                  label={item.name}
                  variant="outlined"
                />
              ))}
              <Button
                sx={{ textTransform: "capitalize" }}
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show less" : "...Show More"}
              </Button>
            </Box>
            <Box mt={5} padding={4}>
              <Typography variant="h4">Reviews and Ratings</Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <RatingBox>{Number(details.rating).toFixed(1)}</RatingBox>
                <Typography variant="h7" textAlign="center">
                  Out of 342 reviews
                </Typography>
              </Stack>
              <ReviewBox>
                <ReviewComponent />
                {/* <Link href={details.write_review} target="blank">
                  Write your Experience
                </Link> */}
              </ReviewBox>
            </Box>
            <Box>
              <Typography>
                <PhoneIcon /> {details.phone}
              </Typography>
              <Typography>
                <MailIcon /> {details.email}
              </Typography>
            </Box>
          </Grid>
          <Grid item md={4} lg={4}>
            <Box mt={4}>
              {user && (
                <Button
                  fullWidth
                  sx={{ backgroundColor: "red", color: "white" }}
                >
                  Login Now to get ₹1000 into your wallet{" "}
                </Button>
              )}
              <Paper sx={{ padding: "20px" }} elevation={3}>
                <h3 style={{ marginBottom: "0px" }}>₹ {price}</h3>
                <Typography variant="caption">
                  + taxes and fee ₹ {gst}
                </Typography>
                <Box
                  sx={{
                    padding: "7px",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6">
                    {checkIn} to {checkOut}
                  </Typography>
                </Box>
                <Box>
                  {room_adults.rooms} Rooms &{" "}
                  {room_adults.adults + room_adults.children} Guests
                </Box>
                <Divider sx={{ margin: "10px 0px" }} />
                <PriceBox>
                  <Typography>Base Price</Typography>
                  <Typography>{price}</Typography>
                </PriceBox>
                <PriceBox>
                  <Typography>Gst </Typography>
                  <Typography>{gst}</Typography>
                </PriceBox>
                <PriceBox>
                  <Typography>Discount</Typography>
                  <Typography>{discount}</Typography>
                </PriceBox>
                <Divider />
                <PriceBox>
                  <Typography>Total</Typography>
                  <Typography>{total}</Typography>
                </PriceBox>
                <Button
                  fullWidth
                  sx={{ backgroundColor: "red", color: "white" }}
                  onClick={handleBooking}
                >
                  Continue Booking
                </Button>
              </Paper>
            </Box>
          </Grid>
        </Grid>
          <Typography variant="h3">Locate us on Google Map</Typography>
        <Box height='400px'>
            <GoogleMap />
        </Box>
      </Container>
    </div>
  );
};

export default HotelDetails;

// banner for homepage
