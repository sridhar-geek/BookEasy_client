/**Shows Bookings of the user */

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

// imports from another files
import HotelCards from "./HotelCards";

const MyBookings = () => {
  const [hotels, setHotels] = useState([]);
  const [reload, setReload] = useState(false)
  // retriew data from userSlice
  const { currentUser } = useSelector((state) => state.user);
 
  useEffect(() => {
    const getHotels = async () => {
      try {
        const hotelData = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/hotel`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
        setHotels(hotelData.data);
      } catch (error) {
        let message = error.response?.data?.msg;
        let errorMessage = message + " " + currentUser.userDetails.name;
        toast.error(errorMessage);
        console.error(error);
      }
    };
    getHotels();
  }, [reload]);



  return (
    <>
      {hotels.length === 0 ? (
        <h1>No Bookings found, please book some hotels.</h1>
      ) : (
        hotels.map((hotel) => (
          <div key={hotel._id} style={{ marginTop: "15px" }}>
           <HotelCards hotel={hotel} setReload={setReload} />
          </div>
        ))
      )}
    </>
  );
};

export default MyBookings;
