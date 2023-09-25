import React, { useState, useEffect } from "react";
import { Box, styled, Paper, Typography, TextField, Button, FormControl } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-toastify'

import Header from "../Components/LoginSingupHeader/Header";
import { useLoginMutation } from "../Slice/userApiSlice";
import { setCredentials } from "../Slice/auth";

const Container = styled(Box)`
  margin-top: 80px;
  height: 70vh;
  background: url("https://imgs.search.brave.com/L4ICNJkqVKh3zD27zjXHEYmlcZCCdPGDnqNQfQvQ5xU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTIw/NDgxMTg2NS9waG90/by9iZWRzLWluLWhv/dGVsLXJvb20tYXQt/dG91cmlzdC1yZXNv/cnQuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPU9FTHBVdFNy/Um5IMUw2bFg5dkcz/UW14ZFI4LXBfYkhX/RjUxYjFEZzRseHM9") ;
`;
const Wrapper = styled(Paper)`
margin-top: 170px;
  width: 55%;
  height: auto;
  margin-left: 35%;
  padding: 20px;
`
const LoginBtn = styled(Button)`
  width: 100%;
  background-color: orangered;
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
  const [login, {isLoading}] = useLoginMutation()
  const {userInfo} = useSelector((state)=> state.auth)

  useEffect(()=> {
    if(userInfo){
      navigate('/')
    }
  },[navigate, userInfo])

  const sumbitHandler = async(e)=>{
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({...res}))
      toast.success('login Sucessful')
      navigate('/')
    } catch (err) {
      // console.log(err.data?.message || err.error)
      toast.error(err.data.msg)
    }
  }
  return (
    <>
      <Header />
      <Container>
        <Wrapper elevation={10} >
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
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ padding: "10px", margin: "10px auto" }}
            />
            <TextField
              variant="outlined"
              placeholder="Password should contain 6 charcters"
              fullWidth
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ padding: "10px", margin: "10px auto" }}
            />
            <LoginBtn type="submit">Login</LoginBtn>
            <SignupText>
              New to BookEasy?{" "}
              <Link to={"/signup"} style={{ textDecoration: "none" }}>
                Signup
              </Link>
            </SignupText>
          </form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;
