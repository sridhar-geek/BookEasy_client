import { Button, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import ShowUserDetails from "./User";
// styled components
const LoginBtn = styled(Button)`
  color: white;
  background-color: orangered;
  text-transform: none;
  &:hover {
    background-color: red;
  }
`;

const Login_Signup = () => {
  const loggedUser = useSelector((state) => state.user);
  const user = loggedUser.currentUser;
  return (
    <>
      {user ? (
        <ShowUserDetails user={user} />
      ) : (
        <Link to={"/login"}>
          <LoginBtn contained>Login/Signup</LoginBtn>
        </Link>
      )}
    </>
  );
};

export default Login_Signup;

// this component shows user profile pic if user exists other wise it shows login button
