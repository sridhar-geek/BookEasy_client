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
import { useState } from "react";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

//Import from another files
import Loader from "../Loader";
import {
  userActionFailure,
  userActionStart,
  stopLoading,
} from "../../redux/userSlice";
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

const HotelCards = ({ hotel, setReload }) => {
  const [open, setOpen] = useState(false);
  // retriew data from userSlice
  let { loading, currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  // handle dialog box
  const handleDeleteClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // convertion of date to readble format
  const dateConversion = (givenDate) => {
    let dateObj = new Date(givenDate);
    let day = dateObj.toLocaleString("default", { weekday: "short" });
    let date = dateObj.getDate();
    let month = dateObj.toLocaleString("default", { month: "short" });
    let returnDate = day + " " + date + " " + month;
    return returnDate;
  };
  // delete hotel
  const handleDelete = async (hotelId) => {
    try {
      dispatch(userActionStart());
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/hotel/${hotelId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      handleClose();
      setReload(prevState=> !prevState)
      dispatch(stopLoading());
      toast.success("Reservation Cancelled");
    } catch (err) {
      dispatch(userActionFailure(err));
      toast.error(err.response?.data?.msg);
    }
  };
  return (
    <Card
      sx={{
        maxWidth: 650,
        display: "flex",
        justifyContent: "space-between",
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
        <Typography variant="caption text" fontSize="0.8rem" display="block">
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
          <ExtraStyle>{dateConversion(hotel.createdAt)}</ExtraStyle>{" "}
        </Typography>
        <Typography>
          Amount Paid:{" "}
          <ExtraStyle>
            {hotel.Symbol} {hotel.amount}
          </ExtraStyle>{" "}
        </Typography>
      </CardContent>
      <Link
        onClick={handleDeleteClick}
        style={{
          padding: "10px",
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
              <DeleteBtn onClick={() => handleDelete(hotel._id)}>Yes</DeleteBtn>
              <NoBtn onClick={handleClose}>No</NoBtn>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Card>
  );
};

export default HotelCards;
