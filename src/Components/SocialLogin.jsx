import { Button, Box, styled } from "@mui/material";
import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

/**Import functions form other files */
import { app } from "./firebase";
import { loginSuccess, loginFailure } from "../redux/userSlice";

//styled components
const GoogleButton = styled(Button)`
  display: flex;
  color: #131313;
  background-color: #eb4e5e;
  width: 100%;
  margin: 2px;
  padding: 10px;
  margin: 10px auto;
  border-radius: 10px;
`;

const SocialLogin = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

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

      // sending user information server , it will either create user or assign access_token to user
      const res = await axios.post("/api/auth/socialLogin", resultData);
      dispatch(loginSuccess(res.data));
      toast.success("Login successful");
      Navigate("/");
    } catch (error) {
      // console.log(error);
      dispatch(loginFailure(error));
      toast.error("something went wrong, please try again later");
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

// Enables user to login with google
