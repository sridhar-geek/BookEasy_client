import { useEffect, useMemo, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
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
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

// import data from "../assests/Api Data/singleHotel.json";
// Imports from another file
import Header from "../Components/MainHeader/Header";
import ReviewComponent from "../Components/Hotel Details/ReviewComponent";
import CheckoutBtn from "../Components/Hotel Details/CheckOut";

// google map component
const GoogleMap = () => {
  const { hotelDetails } = useSelector((state) => state.hotels);
  const data = hotelDetails;
  const [infowindowOpen, setInfowindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();
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
          <AdvancedMarker
            ref={markerRef}
            onClick={() => setInfowindowOpen(true)}
            position={{ lat, lng }}
            title={"AdvancedMarker that opens an Infowindow when clicked."}
          />
          {infowindowOpen && (
            <InfoWindow
              anchor={marker}
              maxWidth={200}
              onCloseClick={() => setInfowindowOpen(false)}
            >
              {data.hotel_name}
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

// creates slider for hotel images
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
const PriceBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;
const OfferBtn = styled(Button)`
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
  // Retrieve hotel details from redux store 
  const { hotelDetails, description } = useSelector((state) => state.hotels);
  const data = hotelDetails;
  console.log(data)
  const { currentUser } = useSelector((state) => state.user);
  const { room_adults } = useSelector((state) => state.details);

  // for getting arrival date and departure date
  const date = data.block[0].paymentterms.prepayment.timeline.stages[0];
  // photos are stored in object which don't have fixed name, this code is to access the first value in that object
  const photoObjKey = Object.keys(data.rooms)[0];
  console.log(date.limit_from_date)
  console.log(date.limit_until_date)
  const photoObj = data.rooms[photoObjKey];
  // calculating price
  const price =
    Math.floor(
      data.composite_price_breakdown.gross_amount_hotel_currency.value
    ) * 0.3;
  const gst = Math.floor(price * 0.3);
  const discount = (price * 25) / 100;
  const total = Math.floor(price + gst - discount);

  // setting up email address and phone number
  const [emailStr, setEmailStr] = useState("");
  const phone = "+91-" + data.block[0].refundable_until_epoch;
  useMemo(() => {
    const email = (emailId) => {
      let str = "";
      for (let i = 0; i < emailId.length; i++) {
        if (emailId.charAt(i) === " ") continue;
        str += emailId.charAt(i);
      }
      let str2 = str.toLowerCase() + "@gmail.com";
      setEmailStr(str2);
    };
    email(data.hotel_name);
  }, []);

  // setting dummy rating
  const [rating, setRating] = useState(null)
  useEffect(()=> {
    const ratingScore = Math.random().toFixed(1) * 3 + 2;
    setRating(ratingScore);
  },[])
  // for showing facilities
  const [showAll, setShowAll] = useState(false);
  const itemsToShow = showAll ? 20 : 5;

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
        {photoObj.photos.map((img) => (
          <Image key={img.photo_id} src={img.url_original} alt="Hotel" />
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
              <Typography mt={2} variant="h6">
                {description[1]
                  ? description[1].description
                  : description[0].description}
              </Typography>
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
                <RatingBox>
                  {rating} <StarIcon fontSize="large" />
                </RatingBox>
                <Typography variant="h7" textAlign="center">
                  Out of 342 reviews
                </Typography>
              </Stack>
              <ReviewBox>
                <ReviewComponent />
              </ReviewBox>
            </Box>
            <Box>
              <Typography variant="h4" mt={4}>
                Contact Us
              </Typography>
              <Typography>
                <PhoneIcon /> {phone}
              </Typography>
              <Typography>
                <MailIcon /> {emailStr}
              </Typography>
            </Box>
          </Grid>
          <Grid item md={4} lg={4}>
            <Box mt={4}>
              {!currentUser && (
                <OfferBtn fullWidth>
                  Login Now to get ₹1000 into your wallet
                </OfferBtn>
              )}
              <Paper sx={{ padding: "20px" }} elevation={3}>
                <h3 style={{ marginBottom: "0px" }}>
                  ₹{" "}
                  {
                    data.composite_price_breakdown.gross_amount_hotel_currency
                      .value
                  }
                </h3>
                <Typography variant="caption">
                  + taxes and fee ₹{gst}
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
                <CheckoutBtn total={total} />
              </Paper>
            </Box>
          </Grid>
        </Grid>
        <Box height="400px" mt={5}>
          <GoogleMap />
        </Box>
      </Container>
    </div>
  );
};

export default HotelDetails;
