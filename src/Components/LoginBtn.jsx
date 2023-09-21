
import React, { useState } from "react";
import { Button, styled } from "@mui/material";
import {Link} from 'react-router-dom'

const LoginBtn = styled(Button)`
    color: white;
    background-color: orangered;
    text-transform: none;
    &:hover{
      background-color: red
    }
`
const Login_Singup = () => {
  const [login, setLogin] = useState(false);

  return (
    <>
      {login ? (
        <Button>Hii User</Button>
      ) : (
        <Link to={"/login"}>
          <LoginBtn contained>Login/Singup</LoginBtn>
        </Link>
      )}
    </>
  );
};

export default Login_Singup;