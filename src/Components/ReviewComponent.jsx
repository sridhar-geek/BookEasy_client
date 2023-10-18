import React, { useSelector } from "react";
import {Avatar, Box, Paper, Typography} from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import HotelData from "./B_dummy data.json";



const ReviewComponent = () => {
  const singleHotel = useSelector((state) => state.hotels);
  // console.log(singleHotel.HotelDetails)
  // console.log(singleHotel)
  const details = singleHotel.hotelDetails

  // const details = HotelData.data[0];

  return (
    <>
      {details.room_tips.map((reviews, i) => (
        <Paper elevation={4} sx={{ padding: "10px", margin: "10px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Avatar src={reviews.user?.avatar.large?.url} alt="userImage" />
              <Typography>{reviews.user.username}</Typography>
            </Box>
            <Typography>
              {Number(reviews.rating).toFixed(1)}
              <StarBorderIcon fontSize="small" />{" "}
            </Typography>
          </Box>
          <Typography key={i} ml={4}>
            {reviews.text}
          </Typography>
        </Paper>
      ))}
    </>
  );
};

export default ReviewComponent;
