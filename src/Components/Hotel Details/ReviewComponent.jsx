/** Displays dummy reviews for a hotel */

import {Avatar, Box, Paper, Typography} from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useEffect, useState } from "react";

/**Imports from another modules */
import reviewsArray from '../../assests/Api Data/review.json'



const ReviewComponent = () => {
  const [hotelReviews, setHotelReviews] = useState([])
  useEffect(()=> {
    // selecting 4 random reviews from reviews array
    const randomNumber = Math.floor(Math.random() * 4);
    const reviews = reviewsArray.content.slice(
      randomNumber * 4,
      (randomNumber + 1) * 4
    );
    setHotelReviews(reviews)
  },[])


  return (
    <>
      {hotelReviews.map((review, i) => (
        <Paper elevation={4} sx={{ padding: "10px", margin: "10px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Avatar src={review.userProfile.avatar.urlTemplate} alt="userImage" />
              <Typography>{review.username}</Typography>
            </Box>
            <Typography>
              {Number(review.rating).toFixed(1)}
              <StarBorderIcon fontSize="small" />{" "}
            </Typography>
          </Box>
          <Typography key={i} ml={4}>
            {review.text}
          </Typography>
        </Paper>
      ))}
    </>
  );
};

export default ReviewComponent;
