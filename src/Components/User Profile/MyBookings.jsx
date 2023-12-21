/**Shows Bookings of the user */

import {useEffect,useState} from 'react'
import axios from 'axios'
import {  Typography,Card,CardContent,CardMedia,CardActionArea } from '@mui/material'
import { toast } from "react-toastify";
const MyBookings = () => {
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    const getHotels = async () => {
      try {
        console.log('request send to hotels route')
        const hotelData = await axios.get("/hotel");
        setHotels(hotelData.data);
      } catch (error) {
        toast.error(error.response.data.msg);
      }
    };
    getHotels();
  }, []);

  // convertion of date to readble format
  const dateConversion=(givenDate)=> {
  let dateObj = new Date(givenDate);
  let day = dateObj.toLocaleString("default", { weekday: "short" });
  let date = dateObj.getDate();
  let month = dateObj.toLocaleString("default", { month: "short" });
  let returnDate = day+" "+date+" "+month
  return returnDate
  }

  return (
    <>
      {hotels.length === 0 ? (
        <h1>No Bookings found, please book some hotels.</h1>
      ) : (
        hotels.map((hotel) => (
          <div key={hotel._id} style={{ marginTop: "15px" }}>
            <Card sx={{ maxWidth: 750 }}>
              <CardActionArea
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  flexWrap: "nowrap",
                }}
              >
                <CardMedia
                  component="img"
                  height="130"
                  sx={{ width: "130px" }}
                  image={hotel.image}
                  alt="hotel image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {hotel.name}
                  </Typography>
                  <Typography variant="subtitle" sx={{ marginBottom: "13px" }}>
                    <span>Adults:</span>{hotel.adults}{" "}
                    {hotel.children > 0 ? (
                      <><span>and Children :</span>{hotel.children} </>
                    ) : (
                      <></>
                    )}
                  </Typography>
                  <Typography >
                    <span>Enjoy your stay from</span>{" "}
                    {dateConversion(hotel.arrivalDate)}{" "} <span>to</span>{" "}
                    {dateConversion(hotel.departureDate)}{" "}
                  </Typography>
                  <Typography>
                    <span>Booked on</span> {dateConversion(hotel.createdAt)}{" "}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ))
      )}
    </>
  );
}

export default MyBookings