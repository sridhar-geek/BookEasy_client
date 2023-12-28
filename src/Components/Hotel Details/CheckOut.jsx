import { Button, styled } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// imports from another files
import hotelDetails from "../../assests/Api Data/singleHotel.json";
import { setDescription, setReason } from "../../redux/paymentSlice";
import Loader from "../Loader";
import { userActionStart, stopLoading } from "../../redux/userSlice";
// component styles
const BookingBtn = styled(Button)`
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
  const { currentUser,loading } = useSelector((state) => state.user);
  // const { hotelDetails } = useSelector((state) => state.hotels);
  const { room_adults, arrivalDate, departureDate } = useSelector(
    (state) => state.details
  );
  const userName = currentUser.userDetails.name;
  const email = currentUser.userDetails.email;

  console.log(arrivalDate + 'arrivalDate from Checkout page')
  console.log(departureDate + 'departureDate from Checkout page')
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
      dispatch(userActionStart())
      const response = await axios.post(`/payment/create-checkout`, intialData);
      const options = {
        key: "rzp_test_rw6Q39PW7qKf1t",
        amount: total * 100,
        currency: "INR",
        name: "Book Easy",
        description: hotelDetails.hotel_name,
        image:
          "https://drive.google.com/uc?export=view&id=1fxnjI4nFSMw_kokiruM6vCzzyXOxpGwb",
        order_id: response.data.id,
        // validating payment
        handler: async function (response) {
          dispatch(stopLoading())
          const body = { ...response };
          try {
            const validate = await axios.post(`/payment/validate`, body);
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
            await axios.post(`/hotel`, hotelData);
            dispatch(stopLoading())
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
        dispatch(stopLoading())
        navigate("/paymentFailed");
      });
      rzp.open();
      e.preventDefault();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <BookingBtn fullWidth onClick={handlePayment}>
          Continue Booking
        </BookingBtn>
      )}
    </>
  );
};

export default CheckoutBtn;
