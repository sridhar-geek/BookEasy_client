import axios from "axios";
import { toast } from "react-toastify";


const BaseUrl = "https://travel-advisor.p.rapidapi.com/"
export const getApiData = async (url) => {
  try {
    const {
      data: { data },
    } = await axios.get(`${BaseUrl}${url}`, {
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    });
    return data;
  } catch (error) {
    toast.error("error in retreving all hotels");
    console.error(error);
  }
};

// Get hotel details from rapid api (travel advisor)
