/**Shows Bookings of the user */

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  styled,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

// imports from another files
import {
  userActionFailure,
  userActionStart,
  stopLoading,
} from "../../redux/userSlice";
import Loader from "../Loader";
//component styles
const DeleteBtn = styled(Button)`
  background-color: red;
  color: white;
  padding: 10px;
  border-radius: 10px;
  &:hover {
    background-color: #ba2b43;
  }
`;
const NoBtn = styled(Button)`
  background-color: #7be67b;
  color: white;
  padding: 10px;
  border-radius: 10px;
  &:hover {
    background-color: #203e20;
  }
`;
const ExtraStyle = styled("span")`
  font-family: Ubuntu;
`;
const MyBookings = () => {
  const [hotels, setHotels] = useState([]);
  const [open, setOpen] = useState(false);
  // retriew data from userSlice
  const { currentUser } = useSelector((state) => state.user);
  let { loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    const getHotels = async () => {
      try {
        const hotelData = await axios.get(`/hotel`);
        setHotels(hotelData.data);
      } catch (error) {
        let message = error.response?.data?.msg;
        let errorMessage = message + " " + currentUser.userDetails.name;
        toast.error(errorMessage);
        console.log(error);
      }
    };
    getHotels();
  }, [open]);

  // convertion of date to readble format
  const dateConversion = (givenDate) => {
    let dateObj = new Date(givenDate);
    let day = dateObj.toLocaleString("default", { weekday: "short" });
    let date = dateObj.getDate();
    let month = dateObj.toLocaleString("default", { month: "short" });
    let returnDate = day + " " + date + " " + month;
    return returnDate;
  };
  // handle dialog box
  const handleDeleteClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // delete hotel
  const handleDelete = async (hotelId) => {
    try {
      dispatch(userActionStart());
      await axios.delete(`/hotel/${hotelId}`);
      handleClose();
      dispatch(stopLoading());
      toast.success("Reservation Cancelled");
    } catch (err) {
      dispatch(userActionFailure(err));
      toast.error(err.response.data?.msg);
      console.log(err);
    }
  };
  return (
    <>
      {hotels.length === 0 ? (
        <h1>No Bookings found, please book some hotels.</h1>
      ) : (
        hotels.map((hotel) => (
          <div key={hotel._id} style={{ marginTop: "15px" }}>
            <Card
              sx={{
                maxWidth: 650,
                display: "flex",
                justifyContent: "start",
                flexWrap: "nowrap",
              }}
            >
              <div>
                <CardMedia
                  component="img"
                  height="130"
                  sx={{ width: "130px" }}
                  image={hotel.image}
                  alt="hotel image"
                />
                <Typography
                  variant="caption text"
                  fontSize="0.8rem"
                  display="block"
                >
                  OrderId: <ExtraStyle>{hotel.orderId}</ExtraStyle>
                </Typography>
                <Typography variant="caption text" fontSize="0.8rem">
                  PaymentId: <ExtraStyle>{hotel.paymentId}</ExtraStyle>
                </Typography>
              </div>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {hotel.name}
                </Typography>
                <Typography variant="subtitle" sx={{ marginBottom: "13px" }}>
                  Adults: <ExtraStyle>{hotel.adults}</ExtraStyle>{" "}
                  {hotel.children > 0 ? (
                    <>
                      and Children : <ExtraStyle>{hotel.children}</ExtraStyle>{" "}
                    </>
                  ) : (
                    <></>
                  )}
                </Typography>
                <Typography>
                  Enjoy your stay from {dateConversion(hotel.arrivalDate)} to{" "}
                  {dateConversion(hotel.departureDate)}{" "}
                </Typography>
                <Typography>
                  Rooms: <ExtraStyle>{hotel.rooms}</ExtraStyle>{" "}
                </Typography>
                <Typography>
                  Booked on{"  "}
                  <ExtraStyle>
                    {dateConversion(hotel.createdAt)}
                  </ExtraStyle>{" "}
                </Typography>
                <Typography>
                  Amount Paid: <ExtraStyle>{hotel.amount}</ExtraStyle>{" "}
                </Typography>
              </CardContent>
              <Link
                onClick={handleDeleteClick}
                style={{
                  paddingTop: "40px 5px 5px 5px",
                  textDecoration: "none",
                  fontSize: "0.7rem",
                  color: "red",
                }}
              >
                {" "}
                <CloseIcon />
              </Link>
              {loading ? (
                <Loader open={loading} />
              ) : (
                <>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Are you sure you want to Cancel your Booking?"}
                    </DialogTitle>
                    <DialogActions
                      sx={{ display: "flex", justifyContent: "space-around" }}
                    >
                      <DeleteBtn onClick={() => handleDelete(hotel._id)}>
                        Yes
                      </DeleteBtn>
                      <NoBtn onClick={handleClose}>No</NoBtn>
                    </DialogActions>
                  </Dialog>
                </>
              )}
            </Card>
          </div>
        ))
      )}
    </>
  );
};

export default MyBookings;
