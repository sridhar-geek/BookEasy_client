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

const HotelCards = ({ hotel }) => {
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
      </CardContent>
    </Card>
  );
};

export default HotelCards;
