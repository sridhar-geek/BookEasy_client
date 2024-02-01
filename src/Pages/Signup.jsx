/** signup page   Creates new user profile to database */

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
import {Visibility, VisibilityOff} from '@mui/icons-material'
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from 'axios'

/**Imports components from another files */
import Header from "../Components/LoginSingupHeader/Header";
import Loader from "../Components/Loader";
import SocialLogin from "../Components/Google login/SocialLogin";
import {userActionStart,stopLoading, userActionFailure} from '../redux/userSlice'
import LoginSignup from "../assests/LoginSignup.jpg";

// Component styles
const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  height: 90vh;
background-repeat: no-repeat;
  background-size: cover;
`;
const Wrapper = styled(Paper)`
  max-width: 600px;
  min-width: 300px;
  margin-left: 50%;
  height: auto;
  padding: 20px;
  border-radius: 5%;
`;
const LoginBtn = styled(Button)`
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  background-color: orangered;
  color: white;
  &:hover {
    background-color: red;
  }
`;

const Signup = () => {
  // store form data (name, email, password)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.user);

  // these states and handlers helps to hide and unhide password 
   const [showPassword, setShowPassword] = useState(false);
   const [showConformPassword, setShowConformPassword] = useState(false);
   const handleClickShowPassword = () => setShowPassword((show) => !show);
   const handleClickShowConformPassword = () =>
   setShowConformPassword((show) => !show);
   const handleMouseDownPassword = (event) => {
     event.preventDefault();
   };

   // this data sends to server to create user 
  const formData = {
    name,
    email,
    password
  }

  // sending user data to server to register
  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== conformPassword)
      toast.error('Passwords do not match')
    else{
      try {
         dispatch(userActionStart());
          await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/auth/register`,
            formData
          );
         dispatch(stopLoading())
        toast.success('Registration successful')
        navigate('/login')
      } catch (err) {
        dispatch(userActionFailure(err));
      toast.error(err.response?.data?.msg);
      }
    }
  }

  return (
    <>
      <Header />
      <Container sx={{backgroundImage:`url(${LoginSignup})`}}>
        <Wrapper>
            <Typography
              variant="h3"
              sx={{
                marginBottom: "20px",
                textAlign: "center",
                userSelect: "none",
              }}
            >
              Signup
            </Typography>
          <form onSubmit={submitHandler}>
            <TextField
              variant="outlined"
              placeholder="Enter your Name"
              fullWidth
              required
              type="text"
              label="Name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ padding: "10px" }}
            />
            <TextField
              variant="outlined"
              placeholder="Enter your Email"
              required
              fullWidth
              type="email"
              label="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ padding: "10px" }}
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
            <OutlinedInput
              placeholder="Conform Password"
              fullWidth
              id="conformPassword"
              value={conformPassword}
              onChange={(e) => setConformPassword(e.target.value)}
              type={showConformPassword ? "text" : "password"}
              sx={{ margin: "10px auto" }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowConformPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConformPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {loading ? <Loader open={loading} /> : <LoginBtn type="submit">Signup</LoginBtn>}
            <Typography sx={{margin:'10px,auto'}}>
              Already have an account?{" "}
              <Link to={"/login"} style={{ textDecoration: "none" }}>
                Login
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

export default Signup;
