import { Button, styled } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import hotelDetails from "../../assests/Api Data/singleHotel.json";
import { setDescription, setReason } from "../../redux/paymentSlice";
// component styles
const CheckOutBtn = styled(Button)`
  background-color: orangered;
  color: white;
  text-transform: capitalize;
  padding: 5px;
  border-radius: 5px;
  &:hover {
    background-color: red;
  }
`;

const CheckoutBtn = ({ total }) => {
  // retriewing user details and hotel details  from reduxSlice
  const { currentUser } = useSelector((state) => state.user);
  // const { hotelDetails } = useSelector((state) => state.hotels);
  const { room_adults, arrivalDate, departureDate } = useSelector(
    (state) => state.details
  );
  const userName = currentUser.userDetails.name;
  const email = currentUser.userDetails.email;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // data sent to server to create orderId
  const intialData = {
    amount: total * 100,
    currency: "INR",
    receipt: Date.now().toString(),
  };
  // main function which calls razorPay window
  const handlePayment = async (e) => {
    try {
      // creating orderId
      const response = await axios.post("/payment/create-checkout", intialData);
      const options = {
        key: "rzp_test_rw6Q39PW7qKf1t",
        amount: total * 100,
        currency: "INR",
        name: "Book Easy",
        description: hotelDetails.hotel_name,
        image:
          "https://drive.google.com/file/d/1fxnjI4nFSMw_kokiruM6vCzzyXOxpGwb/view?usp=drive_link",
        order_id: response.data.id,
        // validating payment
        handler: async function (response) {
          const body = { ...response };
          try {
            const validate = await axios.post("/payment/validate", body);
            console.log(validate.data);
            // data sent to server to create hotel in user account
            const hotelData = {
              name: hotelDetails.hotel_name,
              user: currentUser.userDetails._id,
              paymentId: validate.data.paymentId,
              orderId: validate.data.orderId,
              rooms: room_adults.rooms,
              adults: room_adults.adults,
              children: room_adults.children,
              amount: total,
              arrivalDate: arrivalDate,
              departureDate: departureDate,
            };
            const hotel = await axios.post("/hotel", hotelData);
            navigate("/paymentSuccess");
          } catch (error) {
            console.error(error);
          }
        },
        prefill: {
          name: userName,
          email: email,
          contact: "+919876543210",
        },
        theme: {
          color: "#fb5607",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        dispatch(setDescription(response.error.description));
        dispatch(setReason(response.error.reason));
        navigate("/paymentFailed");
      });
      rzp.open();
      e.preventDefault();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CheckOutBtn fullWidth onClick={handlePayment}>
      Continue Booking
    </CheckOutBtn>
  );
};

export default CheckoutBtn;
