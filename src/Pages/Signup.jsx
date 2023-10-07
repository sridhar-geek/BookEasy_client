import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import {Visibility, VisibilityOff} from '@mui/icons-material'
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from 'axios'

/**Imports components from another files */
import { setCredentials } from "../Slice/auth";
import { useRegisterMutation } from "../Slice/userApiSlice";

import Header from "../Components/LoginSingupHeader/Header";
import Loader from "../Components/Loader";

// Component styles
const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  height: 90vh;
  background: url("https://imgs.search.brave.com/L4ICNJkqVKh3zD27zjXHEYmlcZCCdPGDnqNQfQvQ5xU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTIw/NDgxMTg2NS9waG90/by9iZWRzLWluLWhv/dGVsLXJvb20tYXQt/dG91cmlzdC1yZXNv/cnQuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPU9FTHBVdFNy/Um5IMUw2bFg5dkcz/UW14ZFI4LXBfYkhX/RjUxYjFEZzRseHM9");
`;
const Wrapper = styled(Paper)`
  max-width: 600px;
  min-width: 500px;
  height: auto;
  padding: 20px;
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
const SignupText = styled(Typography)`
  margin: 10px auto;
`;

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  // const dispatch = useDispatch()
  // const {userInfo } = useSelector((state) => state.auth)

  // const [register, {isLoading}] = useRegisterMutation()

  // these states and handlers helps to hide and unhide password 
   const [showPassword, setShowPassword] = useState(false);
   const [showConformPassword, setShowConformPassword] = useState(false);
   const handleClickShowPassword = () => setShowPassword((show) => !show);
   const handleClickShowConformPassword = () =>
   setShowConformPassword((show) => !show);
   const handleMouseDownPassword = (event) => {
     event.preventDefault();
   };

  // useEffect (()=> {
  //   if(userInfo)
  //     navigate('/')
  // }, [navigate, userInfo])

  //  const submitHandler = async (e) => {
  //    e.preventDefault();
  //    if (password !== conformPassword) {
  //      toast.error("Passwords do not match");
  //    } else {
  //      try {
  //        const res = await register({ name, email, password }).unwrap();
  //        dispatch(setCredentials({ ...res }));
  //        navigate("/");
  //      } catch (err) {
  //        toast.error(err.data.msg);
  //      }
  //    }
  //  };

  const data = {
    name,
    email,
    password
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== conformPassword)
      toast.error('Passwords do not match')
    else{
      try {
        setLoading(true)
        await axios.post("/api/auth/register" , data);
        console.log('user registration successful')

        setLoading(false)
        navigate('/')
      } catch (err) {
        toast.erro(err.data)
      }
    }
  }

  return (
    <>
      <Header />
      {loading && (<Loader />)}
      <Container>
        <Wrapper>
          <form onSubmit={submitHandler}>
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
            <TextField
              variant="outlined"
              placeholder="Enter your Name"
              fullWidth
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
            <LoginBtn type="submit">Signup</LoginBtn>
            <SignupText>
              Already have an account?{" "}
              <Link to={"/login"} style={{ textDecoration: "none" }}>
                Login
              </Link>
            </SignupText>
          </form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Signup;
