import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  styled,
  Grid,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";

// import HotelData from "../Components/B_dummy data.json";
import Header from "../Components/HomePage/Header";
import { HotelRoomImages } from "../assests/ImageUrl";
import ReviewComponent from "../Components/ReviewComponent";

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
`
const NavItems = styled(Typography)`
`
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
`
const Link = styled("a")`
  text-decoration: none;
  padding: 10px;
  border-radius: 5px;
  background-color: orangered;
  color: white;
  &:hover{
    background-color: red;
  }
`;
const HotelDetails = () => {
  const singleHotel = useSelector((state) => state.hotels);
  // console.log(singleHotel)
  // console.log(singleHotel.hotelDetails)
  const details = singleHotel.hotelDetails;
// console.log(details.address)

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
        <Typography variant="subtitle2" mt={2}>
          {details.address}
        </Typography>
        <NavBox>
          <NavItems>Overview</NavItems>
          <NavItems>Facilities</NavItems>
          <NavItems>Reviews</NavItems>
          <NavItems>Contact</NavItems>
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
              {details.amenities?.map((item, i) => (
                <Chip
                  sx={{ padding: 2, margin: 1, userSelect: "none" }}
                  key={i}
                  label={item.name}
                  variant="outlined"
                />
              ))}
            </Box>
            <Box mt={5} padding={4}>
              <Typography variant="h4">User Reviews</Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <RatingBox>{Number(details.rating).toFixed(1)}</RatingBox>
                <Typography variant="h7" textAlign="center">
                  Out of 342 reviews
                </Typography>
              </Stack>
              <ReviewBox>
                {/* <ReviewComponent /> */}
                <Link href={details.write_review} target="blank">
                  Write your Experience
                </Link>
              </ReviewBox>
            </Box>
            <Box>
              {/* <Stack direction="column" alignItems="center" spacing={2}> */}
              {/* <Typography > Street : {details.address_obj.street1} landmark : {details.address_obj.street2}</Typography> */}
              <Typography>
                {" "}
                <PhoneIcon /> {details.phone}
              </Typography>
              <Typography>
                {" "}
                <MailIcon /> {details.email}
              </Typography>
              {/* </Stack> */}
            </Box>
          </Grid>
          <Grid item md={4} lg={4}>
            <Box>
              <h1>Price category box here</h1>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HotelDetails;

// banner for homepage
