import { Box, CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import functions from another files
import {Home, Login, Signup, Footer, ShowHotels, Attractions, Profile, ProtectedRoute, HotelDetails, Payment} from './Pages'


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
        <Route path="/attractions" element={<Attractions />} />
        <Route path="/hotelDetails" element={ <HotelDetails /> } />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment" element={<Payment />} />
        </Route>
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
