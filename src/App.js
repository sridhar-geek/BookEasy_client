import { Box, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
  import "react-toastify/dist/ReactToastify.css";
  
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Footer from './Components/Footer';
import ShowHotels from './Pages/Hotels';
import Attractions from './Pages/Attractions';

function App() {
  return (
   <Box>
    <ToastContainer />
    <CssBaseline />
    <Routes>
    <Route path='/' element={ <Home /> } />
    <Route path='/login' element={ <Login /> } />
    <Route path='/signup' element={ <Signup /> } />
    <Route path='/hotels' element ={ <ShowHotels /> } />
    <Route path='/attractions' element ={ <Attractions /> } />
    </Routes>
    <Footer />
   </Box>
  );
}

export default App;
