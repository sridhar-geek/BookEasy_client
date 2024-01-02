/** Checkout function which handles whole razorpay payment and create hotel in user's account */
import { Button, styled } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// imports from another files
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
  const { hotelDetails } = useSelector((state) => state.hotels);
  const { room_adults, arrivalDate, departureDate, photo } = useSelector(
    (state) => state.details
  );
  const userName = currentUser.userDetails.name;
  const email = currentUser.userDetails.email;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
// mainpulating price so that maximum amount exceeds warning won't come in razorpay payment gateway
const maxAmount = ()=> {
  if(total < 12500) return total*100;
  else return total*10
}
  // data sent to server to create orderId
  const intialData = {
    amount: maxAmount(),
    currency: "INR",
    receipt: Date.now().toString(),
  };
  // main function which calls razorPay window
  const handlePayment = async (e) => {
    try {
      // creating orderId
      dispatch(userActionStart())
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/payment/create-checkout`,
        intialData,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      dispatch(stopLoading())
      const options = {
        key: "rzp_test_rw6Q39PW7qKf1t",
        amount: maxAmount(),
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
            const validate = await axios.post(
              `${process.env.REACT_APP_SERVER_URL}/payment/validate`,
              body,
              {
                headers: {
                  Authorization: `Bearer ${currentUser.token}`,
                },
              }
            );
            // data sent to server to create hotel in user account
            const hotelData = {
              name: hotelDetails.hotel_name,
              image: photo,
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
            await axios.post(
              `${process.env.REACT_APP_SERVER_URL}/hotel`,
              hotelData,
              {
                headers: {
                  Authorization: `Bearer ${currentUser.token}`,
                },
              }
            );
            dispatch(stopLoading())
            navigate("/paymentSuccess");
          } catch (error) {
            dispatch(stopLoading())
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
      // if payment failed 
      rzp.on("payment.failed", function (response) {
        dispatch(setDescription(response.error.description));
        dispatch(setReason(response.error.reason));
        dispatch(stopLoading())
        navigate("/paymentFailed", { state: { from: location } });

      });
      rzp.open();
      e.preventDefault();
    } catch (error) {
      dispatch(stopLoading())
      console.error(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader open={loading} />
      ) : (
        <BookingBtn fullWidth onClick={handlePayment}>
          Continue Booking
        </BookingBtn>
      )}
    </>
  );
};

export default CheckoutBtn;
