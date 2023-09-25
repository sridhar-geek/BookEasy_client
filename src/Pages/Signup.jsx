import React, { useState } from "react";
import {
  Box,
  styled,
  Paper,
  Typography,
  TextField,
  Button,

} from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../Components/LoginSingupHeader/Header";

const Container = styled(Box)`
  margin-top: 80px;
  height: 70vh;
  background: url("https://imgs.search.brave.com/L4ICNJkqVKh3zD27zjXHEYmlcZCCdPGDnqNQfQvQ5xU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTIw/NDgxMTg2NS9waG90/by9iZWRzLWluLWhv/dGVsLXJvb20tYXQt/dG91cmlzdC1yZXNv/cnQuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPU9FTHBVdFNy/Um5IMUw2bFg5dkcz/UW14ZFI4LXBfYkhX/RjUxYjFEZzRseHM9");
`;
const Wrapper = styled(Paper)`
  margin-top: 170px;
  width: 55%;
  height: auto;
  margin-left: 35%;
  padding: 20px;
`;
const LoginBtn = styled(Button)`
  width: 100%;
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
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [conformPassword, setConformPassword] = useState('')

    const sumbitHandler = async(e)=>{
    e.preventDefault();
    console.log(email, password)
    }

  return (
    <>
      <Header />
      <Container>
        <Wrapper elevation={10} onSubmit={sumbitHandler}>
          <Typography
            variant="h3"
            sx={{ marginBottom: "20px", textAlign: "center" }}
          >
            Signup
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Enter your Name"
            fullWidth
            type="text"
            label="Name"
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ padding: "10px" }}
          />
          <TextField
            variant="outlined"
            placeholder="Password should contain 6 charcters"
            required
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ padding: "10px" }}
          />
          <TextField
            variant="outlined"
            placeholder="Password should contain 6 charcters"
            required
            fullWidth
            type="password"
            label="Conform Password"
            value={conformPassword}
            onChange={(e) => setConformPassword(e.target.value)}
            sx={{ padding: "10px" }}
          />
          <LoginBtn type="submit">Signup</LoginBtn>
          <SignupText>
            Already have an account?{" "}
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              Login
            </Link>
          </SignupText>
        </Wrapper>
      </Container>
    </>
  );
};

export default Signup;
