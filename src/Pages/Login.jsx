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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-toastify'
import axios from "axios";

// import functions from another files
import Header from "../Components/LoginSingupHeader/Header";
import {loginStart, loginFailure, loginSuccess} from '../redux/userSlice'
import Loader from "../Components/Loader";
import SocialLogin from "../Components/Google login/SocialLogin";

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
  max-width: 500px;
  min-width: 450px;
  height: auto;
  padding: 20px;
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
const SignupText = styled(Typography)`
  margin :10px  auto;
`


const Login = () => {
  const [email, setEmail ] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {loading, error} = useSelector((state)=> state.user)

  // this is for hide and unhide password feild 
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
       const handleMouseDownPassword = (event) => {
         event.preventDefault();
    };

const formData = {
  email, 
  password
}
console.log(formData)
// sending data for login
  const sumbitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart())
      const data = await axios.post('http://localhost:5000/api/auth/login', formData)
      dispatch(loginSuccess(data.data))
      toast.success('user login successful')
      navigate('/')
    } catch (err) {
      toast.error(error.response.data.msg)
      dispatch(loginFailure(error))
      console.log(err)
    }
  };
  return (
    <>
      <Header />
      <Container>
        <Wrapper elevation={10}>
          <form onSubmit={sumbitHandler}>
            <Typography
              variant="h3"
              sx={{ marginBottom: "20px", textAlign: "center" }}
            >
              Login
            </Typography>
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
            <SignupText>
              New to BookEasy?{" "}
              <Link to={"/signup"} style={{ textDecoration: "none" }}>
                Signup
              </Link>
            </SignupText>
          </form>
          <Divider />
          <SocialLogin />
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;

// login user