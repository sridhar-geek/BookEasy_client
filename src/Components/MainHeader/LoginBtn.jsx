/** This component shows user profile pic if user exists other wise it shows login button */

import { Button, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

/*Import modules from other files  */
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
  // retriewing user data from user slice
  const {currentUser} = useSelector((state) => state.user);
  return (
    <>
      {currentUser ? (
        <ShowUserDetails user={currentUser} />
      ) : (
        <Link to={"/login"}>
          <LoginBtn contained>Login/Signup</LoginBtn>
        </Link>
      )}
    </>
  );
};

export default Login_Signup;
