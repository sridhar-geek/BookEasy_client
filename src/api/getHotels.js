// Get hotel details from rapid api (travel advisor)

import axios from "axios";
import { toast } from "react-toastify";

const BaseUrl = "https://booking-com15.p.rapidapi.com/api/v1/hotels";
export const getApiData = async (url) => {
  try {
    const {
      data: { data },
    } = await axios.get(`${BaseUrl}${url}`, {
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
      },
    });
    // console.log("api data called");
    // console.log(data);
    return data;
  } catch (error) {
    toast.error("error in retreving all hotels");
    console.error(error);
  }
};
