import React from 'react'
import { AppBar, Box, Button, Toolbar, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import Logo from "../../assests/Hotel_logo.jpeg"


const Container = styled(AppBar)`
  background-color: #282525;
`;
const RightContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-right: 5%;
`;
const Wrapper = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const Backbtn = styled(Button)`
  color: white;
  background-color: orangered;
  text-transform: none;
  &:hover {
    background-color: red;
  }
`;

const Image = styled("img")`
  height: 45px;
  width: 70px;
  user-select: none;
`;
const Login_Header = () => {
  return (
    <Container elevation={1}>
      <Wrapper>
        <Link to={"/"}>
          <Image src={Logo} alt="logo" />
        </Link>
        <RightContainer>
          <Link to={"/"}>
            <Backbtn>
              <KeyboardBackspaceIcon style={{ marginRight: "10px" }} />
              Back to Home
            </Backbtn>
          </Link>
        </RightContainer>
      </Wrapper>
    </Container>
  );
};

export default Login_Header;



