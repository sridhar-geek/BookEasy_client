

import { Button, styled } from "@mui/material";
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import UserProfile from "./UserProfile";

const LoginBtn = styled(Button)`
    color: white;
    background-color: orangered;
    text-transform: none;
    &:hover{
      background-color: red
    }
`
const UserBtn = styled(Button)`
  color: white;
  background-color: orangered;
  border-radius: 20px;
  text-transform: capitalize;
  &:hover {
    background-color: red;
  }
`;
const Login_Singup = () => {
  const {userInfo } = useSelector((state)=> state.auth)

  return (
    <>
      {userInfo ? (
          <UserProfile />
      ) : (
        <Link to={"/login"}>
          <LoginBtn contained>Login/Singup</LoginBtn>
        </Link>
      )}
    </>
  );
};

export default Login_Singup;