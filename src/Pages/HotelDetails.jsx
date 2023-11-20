import { useEffect, useMemo, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

import data from '../assests/Api Data/singleHotel.json'
// Imports from another file
import Header from "../Components/MainHeader/Header";
import { getApiData } from "../api/getHotels";
import ReviewComponent from "../Components/Hotel Details/ReviewComponent";

// google map component
const GoogleMap = () => {
  // const { hotelDetails } = useSelector((state) => state.hotels);
  // const data = hotelDetails;

  const lat = Number(data.latitude);
  const lng = Number(data.longitude);

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
};

// creates slider of hotel images
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
  background-color: #ffffff;
  width: 100%;
  position: sticky;
  top: 70px;
  /* border-radius: 10px; */
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
const CheckOutBtn = styled(Button)`
  background-color: orangered;
  color: white;
  text-transform: capitalize;
  padding: 5px;
  border-radius: 5px;

  &:hover {
    background-color: red;
  }
`;

const HotelDetails = () => {
  /**Retrieve hotel details from redux store */
  // const { hotelDetails } = useSelector((state) => state.hotels);
  // const data = hotelDetails;
  const hotelId = data.hotel_id;

  const { currentUser } = useSelector((state) => state.user);
  const { room_adults } = useSelector((state) => state.details);
  // for getting arrival date and departure date
  const date = data.block[0].paymentterms.prepayment.timeline.stages[0];
  // photos are stored in object which don't have fixed name, this code is to access the first value in that object
  const photoObjKey = Object.keys(data.rooms)[0];
  const photoObj = data.rooms[photoObjKey];
  // calculating price 
const price = Math.floor(
  data.composite_price_breakdown.gross_amount_hotel_currency.value
)*0.3;
const gst = Math.floor(price*0.3)
const discount = price*25/100;
const total = Math.floor(price +gst -discount)

// setting up email address and phone number
const [emailStr, setEmailStr] = useState('')
const phone = '+91-'+data.block[0].refundable_until_epoch
useMemo(()=> {
  const email = (emailId) => {
    let str = "";
    for (let i = 0; i < emailId.length; i++) {
      if (emailId.charAt(i) === " ") continue;
      str += emailId.charAt(i);
    }
    let str2 = str.toLowerCase() + "@gmail.com";
    setEmailStr(str2)
  };
  email(data.hotel_name)
},[hotelId])

  // calling description api to show description
  const [description, setDescription] = useState([]);
  // useEffect(() => {
  //   const description = async () => {
  //     const desc = await getApiData(
  //       `/getDescriptionAndInfo?hotel_id=${hotelId}`
  //     );
  //     setDescription(desc);
  //   };
  //   console.log("data called once 1");
  //   description();  
  // }, [hotelId]);
  // console.log(description)
  // setting dummy rating
  const rating = Math.random().toFixed(1) * 3 + 2;
  // for showing facilities
  const [showAll, setShowAll] = useState(false);
  const itemsToShow = showAll ? 20 : 5;

  const navigate = useNavigate();
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
        {photoObj.photos.map((img, index) => (
          <Image src={img.url_original} alt="Hotel" />
        ))}
      </Carousel>
      <Container>
        <Title>
          <Typography variant="h3">{data.hotel_name}</Typography>
          <RatingBox>
            {rating} <StarIcon fontSize="large" />
          </RatingBox>
        </Title>
        <Typography variant="subtitle2" margin={2}>
          {data.address}
          {data.zip}
        </Typography>
        <NavBox>
          <NavItems>Overview</NavItems>
          <NavItems>Facilities</NavItems>
          <NavItems>Reviews</NavItems>
          <NavItems>Contact</NavItems>
          <NavItems>Locate Us</NavItems>
        </NavBox>
        <Divider
          sx={{ margin: 2, bgcolor: "black", position: "sticky", top: "100px" }}
        />
        <Grid container spacing={2}>
          <Grid item md={8} lg={8}>
            <Box>
              <Typography variant="h4" mt={4}>
                Overview
              </Typography>
              {/* <Typography mt={2} variant="h6">
                {description[1]
                  ? description[1].description
                  : description[0].description}
              </Typography> */}
            </Box>
            <Box>
              <Typography variant="h4" mt={4}>
                Amenities
              </Typography>
              {data.property_highlight_strip
                ?.slice(0, itemsToShow)
                .map((item, i) => (
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
                <RatingBox>{rating}</RatingBox>
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
                {" "}
                <PhoneIcon /> {phone}
              </Typography>
              <Typography>
                {" "}
                <MailIcon /> {emailStr}
              </Typography>
            </Box>
          </Grid>
          <Grid item md={4} lg={4}>
            <Box mt={4}>
              {currentUser && (
                <CheckOutBtn fullWidth>
                  Login Now to get ₹1000 into your wallet
                </CheckOutBtn>
              )}
              <Paper sx={{ padding: "20px" }} elevation={3}>
                <h3 style={{ marginBottom: "0px" }}>₹ {price}</h3>
                <Typography variant="caption">
                  + taxes and fee ₹{price}
                </Typography>
                <Box
                  sx={{
                    padding: "7px",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6">
                    {date.limit_from_date} to {date.limit_until_date}
                  </Typography>
                </Box>
                <Box>
                  {room_adults.rooms} Rooms &{" "}
                  {room_adults.adults + room_adults.children} Guests
                </Box>
                <Divider sx={{ margin: "10px 0px" }} />
                <PriceBox>
                  <Typography>Base Price</Typography>
                  <Typography>
                    {/* {Number(
                      data.composite_price_breakdown.gross_amount_hotel_currency
                        .value
                    ).toFixed(0)} */}
                    {price}
                  </Typography>
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
                <CheckOutBtn
                  fullWidth
                  sx={{ backgroundColor: "red", color: "white" }}
                  onClick={() => navigate("/checkout")}
                >
                  Continue Booking
                </CheckOutBtn>
              </Paper>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="h3">Locate us on Google Map</Typography>
        <Box height="400px">
          <GoogleMap />
        </Box>
      </Container>
    </div>
  );
};

export default HotelDetails;

