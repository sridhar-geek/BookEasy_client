import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import Header from "../Components/MainHeader/Header";
import HotelData from "../Components/B_dummy data.json";

const Payment = () => {
  // const singleHotel = useSelector((state) => state.hotels);
  // const details = singleHotel.hotelDetails;
  const { room_adults, price, date } = useSelector((state) => state.details);
  const details = HotelData.data[0];
  const total = price + (price * 15) / 100 - (price * 20) / 100;

  date.startDate.setHours(0, 0, 0, 0);
  date.endDate.setHours(0, 0, 0, 0);
  let options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const checkIn = date.startDate.toLocaleDateString("en-US", options);
  const checkOut = date.endDate.toLocaleDateString("en-US", options);
  return (
    <>
      <Header />
      <Box mt={13}>
        <Typography variant="h4">Review Booking Details</Typography>
        <Card sx={{ display: "flex" }}>
          <CardMedia
            sx={{ height: "200px", width: "200px" }}
            component="img"
            image={
              details.photo
                ? details.photo.images.large.url
                : "https://imgs.search.brave.com/aPFnAJCGtCjFvRI5vCCVs1edHRYSG5PiucHMlkDOaw8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTIw/NDQzMDYwL3Bob3Rv/L3RoZS10YWotbWFo/YWwtcGFsYWNlLWhv/dGVsLWF0LWR1c2su/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUVKa1ZlZUxtXzZu/eW5zN2JmVWxDamdz/UE40STRSOWd0Q3Nm/a3RZX2dsOWs9"
            }
            alt="hotel image"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              marginbottom={2}
            >
              {details.name}
            </Typography>
            <Typography variant="body1" color="text.primary">
              {details.location_string}
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Box mt={2}>
                <Typography>
                  {room_adults.rooms} X{" "}
                  {room_adults.rooms < 2 ? <>Room</> : <>Rooms</>}
                </Typography>
                <Typography>
                  {room_adults.adults} X{" "}
                  {room_adults.adults < 2 ? <>Adult</> : <>Adults</>}{" "}
                </Typography>
                <Typography>
                  {room_adults.children > 0 && (
                    <>{room_adults.children} children</>
                  )}
                </Typography>
              </Box>
              <Box mt={2}>
                {/* <Typography>Check In:{date.startDate}</Typography> */}
                <Typography>Check In: {checkIn}</Typography>
                <Typography>Check Out: {checkOut} </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Payment;
