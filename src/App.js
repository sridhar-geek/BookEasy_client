import { Box, CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

    /*Import modules from other files  */
import {
  Home,
  Login,
  Signup,
  Footer,
  ShowHotels,
  Profile,
  ProtectedRoute,
  HotelDetails,
  PaymentFailure,
  PaymentSucess,
  NotFound,
} from "./Pages";

function App() {
  return (
    <Box>
      <ToastContainer />
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/hotels" element={<ShowHotels />} />
        <Route path="/hotelDetails" element={<HotelDetails />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/PaymentSuccess" element={<PaymentSucess />} />
          <Route path="/PaymentFailed" element={<PaymentFailure />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
