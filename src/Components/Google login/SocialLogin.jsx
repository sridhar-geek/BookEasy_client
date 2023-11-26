/**Helps user to login with their google account */

import { Button, Box, styled } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

/**Import functions form other files */
import { app } from "./firebase";
import { userActionStart, userActionSuccess, userActionFailure } from "../../redux/userSlice";

//styled components
const GoogleButton = styled(Button)`
  display: flex;
  color: #131313;
  background-color: #f08057;
  width: 100%;
  margin: 2px;
  padding: 10px;
  margin: 10px auto;
  border-radius: 10px;
  &:hover {
    background-color: #e34747;
  }
`;

const SocialLogin = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const {error} = useSelector((state)=> state.user)

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      // storing user data in a object
      const resultData = {
        name: result.user.displayName,
        email: result.user.email,
        profilePicture: result.user.photoURL,
      };
      dispatch(userActionStart())
      // sending user information server , it will either create user or assign access_token to user
      const res = await axios.post("/auth/socialLogin", resultData);
      dispatch(userActionSuccess(res.data));
      toast.success("Login successful");
      Navigate("/");
    } catch (err) {
      dispatch(userActionFailure(err));
      // toast.error("something went wrong, please try again later");
      toast.error(error.response.data.msg);
      console.log(err)
      console.log(error)
    }
  };

  return (
    <Box>
      <GoogleButton onClick={handleLogin}>
        <GoogleIcon />
        Continue with Google
      </GoogleButton>
    </Box>
  );
};

export default SocialLogin;

