// Get hotel details from rapid api (travel advisor)

import axios from "axios";
import { toast } from "react-toastify";

// imports from another files
import Loader from "../Components/Loader";


const BaseUrl = "https://booking-com15.p.rapidapi.com/api/v1/hotels";

export const GetApiData = async (url) => {
  try {
    const {
      data: { data },
    } = await axios.get(`${BaseUrl}${url}`, {
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY_Backup,
        "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
      },
    });
    return data;
  } catch (error) {
    toast.error("error in retreving hotels");
    <Loader open={false} />
    console.error(error);
  }
};
