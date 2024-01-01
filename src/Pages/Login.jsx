/**Login  page   login user based on their credentails */

import React, { useState } from "react";
import {
  Box,
  styled,
  Paper,
  Typography,
  TextField,
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-toastify'
import axios from "axios";

// import functions from another files
import Header from "../Components/LoginSingupHeader/Header";
import {userActionStart, userActionSuccess, userActionFailure} from '../redux/userSlice'
import Loader from "../Components/Loader";
import SocialLogin from "../Components/Google login/SocialLogin";

// Component styles
const Container = styled(Box)`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  margin-top: 60px;
  height: 90vh;
  background: url("https://drive.google.com/uc?export=view&id=1CYy4fOxOXE6mXI_mRyO5XNdhSefGX5Ka")
    no-repeat;
  background-size: cover;
`;
const Wrapper = styled(Paper)`
  max-width: 500px;
  min-width: 200px;
  height: auto;
  padding: 20px;
  margin-left: 50%;
  border-radius: 5%;
`;
const LoginBtn = styled(Button)`
  width: 100%;
  background-color: orangered;
  padding: 10px;
  color: white;
  &:hover{
    background-color: red;
  }
`

const Login = () => {
  // display data in input feild
  const [email, setEmail ] = useState('')
  const [password, setPassword] = useState('')
  
  // retriewing data from user slice 
  const {loading} = useSelector((state)=> state.user)

  const navigate = useNavigate()
  const dispatch = useDispatch()
    const location = useLocation();

  // this is for hide and unhide password feild 
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
       const handleMouseDownPassword = (event) => {
         event.preventDefault();
    };

    // data which is send to server
const formData = {
  email, 
  password
}
  const sumbitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(userActionStart())
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/login`,
      formData,
      { withCredentials: true }
    );
      dispatch(userActionSuccess(data.data))
      toast.success('Login successful')
    navigate(location.state?.from || '/');
    } catch (err) {
      dispatch(userActionFailure(err))
      toast.error(err.response?.data?.msg)
      console.log(err)
    }
  };
  return (
    <>
      <Header />
      <Container>
        <Wrapper elevation={10}>
            <Typography
              variant="h3"
              sx={{ marginBottom: "20px", textAlign: "center" }}
            >
              Login
            </Typography>
          <form onSubmit={sumbitHandler}>
            <TextField
              variant="outlined"
              placeholder="Enter your Email"
              fullWidth
              required
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ padding: "10px", margin: "10px auto" }}
            />
            <OutlinedInput
              placeholder="Password"
              fullWidth
              required
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              sx={{ margin: "10px auto" }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {loading ? <Loader open={loading} /> : <LoginBtn type="submit">Login</LoginBtn>}
            <Typography sx={{margin: '10px, auto'}}>
              New to BookEasy?{" "}
              <Link to={"/signup"} style={{ textDecoration: "none" }}>
                Signup
              </Link>
            </Typography>
          </form>
          <Divider />
          <SocialLogin />
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;
