import axios from "axios";
import { toast } from "react-toastify";

// get all hotel details in a city based on latitude and longitude
export const getHotels = async () => {
  try {
    const {
      data: { data },
    } = await axios.get(
      "https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng",
      {
        params: {
          latitude: "17.686815",
          longitude: "83.218483",
        },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    toast.error("error in retreving all hotels");
    console.log(error);
  }
};

// get details of a single hotel based on location_id
export const singleHotelDetails = async (locationId) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      "https://travel-advisor.p.rapidapi.com/hotels/get-details",
      {
        params: {
          location_id: `${locationId}`,
        },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    console.log(data);
    console.log("api called data");
    return data
  } catch (error) {
    console.log(error);
    toast.error("error in retrieving hotel details");
  }
};

// Get hotel details from rapid api (travel advisor)
