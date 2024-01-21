// Get hotels and their details from rapid api (travel advisor)

import axios from "axios";
import { toast } from "react-toastify";

const BaseUrl = "https://booking-com15.p.rapidapi.com/api/v1/hotels";

export const GetApiData = async (url) => {
  console.log('request came to get hotels data')
  try {
    console.log('I am in try block of getApiData')
    const {
      data: { data },
    } = await axios.get(`${BaseUrl}${url}`, {
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
      },
    });
    console.log(data)
    return data;
  } catch (error) {
    console.log("I am in catch block")
    toast.error("error in retreving hotels");
    console.error(error);
  }
};
