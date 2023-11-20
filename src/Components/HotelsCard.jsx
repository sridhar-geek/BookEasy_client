/** Card that shows hotel info in the hotels page */

import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Rating,
  styled,
  Box,
  Button,
  Stack,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

/* Import modules from another files */
import { getApiData } from "../api/getHotels";
import { getSingleHotelDetails, gettingDetails } from "../redux/SearchSlice";
import Loader from "./Loader";

//Component styles
const AvaliBtn = styled(Button)`
  background-color: orangered;
  color: white;
  text-transform: capitalize;
  padding: 5px;
  border-radius: 5px;

  &:hover {
    background-color: red;
  }
`;

const Hotels = ({ place,key }) => {
  // retriewing data from hotelslice and detailsSlice
  const { loading } = useSelector((state) => state.hotels);
  const { room_adults, arrivalDate, departureDate } = useSelector(
    (state) => state.details
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // calculating no.of days
  const date1 = new Date(arrivalDate);
  const date2 = new Date(departureDate);
  const noOfDays = Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
  //calcualating price
  const price = ((Math.floor(place.min_total_price) * 30) / 100).toFixed(0);

  // storing singlehotel in redux store
  // const handleClick = async (hotelId) => {
  const handleClick = () => {
    // dispatch(gettingDetails());
    // const data = await getApiData(
    //   `/getHotelDetails?hotel_id=${hotelId}&arrival_date=${arrivalDate}&departure_date=${departureDate}&currency_code=INR`
    // );
    // console.log('data returned ')
    // dispatch(getSingleHotelDetails(data));
    navigate("/hotelDetails");
  };
  const randomNumber = Math.random() * 40;
  const collectionID = 9715310; //the collection ID from the original url
  const imageUrl = `https://source.unsplash.com/collection/${collectionID}/480x480/?sig=${randomNumber}`;

  return (
    <Card sx={{ maxWidth: 750 }}>
      <CardActionArea
        sx={{ display: "flex", justifyContent: "start", flexWrap: "nowrap" }}
        onClick={() => handleClick(place.hotel_id)}
      >
        <CardMedia
          component="img"
          height="270"
          sx={{ width: "220px" }}
          image={imageUrl}
          alt="hotel "
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {key}
          </Typography>
          <Typography gutterBottom variant="h5">
            {place.hotel_name}
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: "13px" }}>
            {place.city}
          </Typography>
          <Stack direction="row" gap={2} mb="2">
            <Typography variant="body2" color="text.secondary">
              Reviews:
            </Typography>
            <Box bgcolor="green" sx={{ padding: "10px", borderRadius: "10px" }}>
              {place.review_score_word ? place.review_score_word : "Good"}
            </Box>
          </Stack>
          <Box display="flex">
            <Box mr={10}>
              <Stack direction="row" gap={2}>
                <Typography variant="body2" color="text.secondary">
                  Rating:
                </Typography>
                <Rating
                  defaultValue={Number(place.review_score / 2)}
                  precision={0.5}
                  readOnly
                />
              </Stack>
            </Box>
            <Box>
              <Typography sx={{ marginLeft: "20px", marginBottom: "10px" }}>
                {noOfDays} Days {room_adults.adults} adults{" "}
                {room_adults.children ? (
                  <>and {room_adults.children} children</>
                ) : (
                  <></>
                )}
              </Typography>
              <Stack direction="row" gap={2}>
                <Typography variant="h5"> ₹ {price}</Typography>
                {loading ? (
                  <Loader />
                ) : (
                  <AvaliBtn>
                    See Availability <ChevronRightIcon />
                  </AvaliBtn>
                )}
              </Stack>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginLeft: "20px" }}
              >
                +Rs {(price * 0.2).toFixed(2)} extra GST and fees
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Hotels;


