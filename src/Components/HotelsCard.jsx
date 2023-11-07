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
  Chip,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// import place from './A_dummy data.json'
/* Imported files */
import { getApiData } from "../api/getHotels";
import { getSingleHotelDetails, gettingDetails } from "../redux/SearchSlice";
import { price } from "../redux/DetailsSlice";
import Loader from "./Loader";


//Component styles
const MediaCard = styled(CardMedia)`
  height: 270px;
  width: 200px;
`;
const Span = styled("span")`
  margin-left: 10px;
`;
const RatingBox = styled(Box)`
  display: flex;
  margin-bottom: 12px;
`;
const FlexBox = styled(Box)`
  display: flex;
  justify-content: center;
`;
const AvaBtn = styled(Button)`
  background-color: orangered;
  color: white;
  text-transform: capitalize;
  border-radius: 5px;
  &:hover {
    background-color: #8e0707;
  }
`;

const Hotels = ({ place }) => {
// const Hotels = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.hotels);
  const { room_adults, date } = useSelector((state) => state.details);
  const navigate = useNavigate();
  const noOfDays = (date.endDate - date.startDate) / (24 * 3600000);
// to remove dummy data from api
  const dulipcate = place.ad_position;

    // calcluating price for hotel based on no.of days and no.of People
  const calucaltePrice = () => {
    let dayCost = 0
    const basePrice =
      room_adults.rooms * 300 +
      room_adults.adults * 100 +
      room_adults.children * 50;
    if(noOfDays<2)
      dayCost = 0;
    else
    dayCost = noOfDays*300
     if(!place.price){
        const price = 800 + basePrice + dayCost
        return price
     }
    const reservePrice =
      place.price.slice(1, 3) * 20 + basePrice + dayCost
    return reservePrice;
  };


  // storing singlehotel in redux store
  const handleClick = async (locationId) => {
  // const handleClick =  () => {
    dispatch(gettingDetails());
    const data = await getApiData(`hotels/get-details?location_id=${locationId}`);
    dispatch(getSingleHotelDetails(data[0]));
    dispatch(price(calucaltePrice()));
    navigate("/hotelDetails");
  };


  return (
    <>
      {!dulipcate && (
        <Card>
          <CardActionArea
            sx={{ display: "flex" }}
            onClick={() => handleClick(place.location_id)}
          >
            <MediaCard
              component="img"
              image={
                place.photo
                  ? place.photo.images.large.url
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
                {place.name}
              </Typography>
              <Typography variant="body1" color="text.primary">
                {place.location_string}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                marginbottom={2}
              >
                {Math.round(place.distance)} km distance from center of the city
              </Typography>
              <FlexBox>
                <Box marginRight={5}>
                  <RatingBox>
                    <Rating
                      value={Number(place.rating)}
                      precision={0.5}
                      size="small"
                      readOnly
                    />
                    <Span> out of {place.num_reviews} rantings </Span>
                  </RatingBox>
                  <Chip
                    icon={<ThumbUpIcon />}
                    label={place.ranking}
                    variant="outlined"
                    marginbottom={2}
                  />
                  {place.awards?.map((award) => (
                    <Chip
                      icon={<EmojiEventsIcon />}
                      label={award.display_name}
                      marginbottom={2}
                    />
                  ))}
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {noOfDays} days {room_adults.adults} adults
                    {room_adults.children > 0 && (
                      <>and {room_adults.children} children </>
                    )}
                  </Typography>
                  <Typography variant="h6" marginLeft={2}>
                    ₹ {calucaltePrice()}
                  </Typography>
                  {loading ? (
                    <Loader open={loading} />
                  ) : (
                    <AvaBtn>
                      See Avalibilty <ChevronRightIcon />
                    </AvaBtn>
                  )}
                </Box>
              </FlexBox>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </>
  );
};

export default Hotels;

