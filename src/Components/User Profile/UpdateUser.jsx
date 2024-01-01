/** Updates user information (photo, name, email and password) */

import React, { useState, useRef, useEffect } from "react";
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
  Avatar,
  Stack,
} from "@mui/material";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

/**Imports components from another files */
import Loader from "../Loader";
import { app } from "../Google login/firebase";
import {
  userActionStart,
  userActionSuccess,
  userActionFailure,
} from "../../redux/userSlice";

// Component styles
const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled(Box)`
  max-width: 550px;
  min-width: 300px;
  height: auto;
  padding: 20px;
`;
const UpdateBtn = styled(Button)`
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  background-color: orangered;
  color: white;
  &:hover {
    background-color: red;
  }
`;
const AvatarComp = styled(Avatar)`
  width: 120px;
  height: 120px;
  cursor: pointer;
  margin-left: 20px;
`;

const UpdateProfile = () => {
  // for storing form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");

  // for uplading image and create reference to avatar
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [imageUrl, setImageUrl] = useState({});

  useEffect(() => {
    if (image) handleFileUpload(image);
  }, [image]);

  /** upload image to firebase storage */
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageError(false)
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setImageUrl({ profilePicture: downloadURL })
        );
      }
    );
  };

  // retriewing data from user slice
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.user);

  // these states and handlers helps to hide and unhide password
  const [showPassword, setShowPassword] = useState(false);
  const [showConformPassword, setShowConformPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConformPassword = () =>
    setShowConformPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // storing user data in single object
  const profilePicture = imageUrl.profilePicture;
  const formData = {
    name,
    email,
    password,
    profilePicture,
  };

  // pre populating user details in the update user route
  useEffect(() => {
      setName(currentUser.userDetails.name);
      setEmail(currentUser.userDetails.email);
  }, []);

  // sending data to updata user profile
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== conformPassword) toast.error("Passwords not matched");
    else {
      try {
        dispatch(userActionStart());
        const data = await axios.put(
          `${process.env.REACT_APP_SERVER_URL}/user/${currentUser.userDetails._id}`,
          formData
        );
        dispatch(userActionSuccess(data.data));
        toast.success("Update successful");
      } catch (err) {
        dispatch(userActionFailure(err));
        toast.error(error.response?.data?.msg);
        console.error(err);
      }
    }
  };

  return (
      <Container>
        <Wrapper>
            <Stack direction="column" sx={{ alignItems: "center" }}>
              <Typography
                variant="h3"
                sx={{
                  marginBottom: "20px",
                  textAlign: "center",
                  userSelect: "none",
                }}
              >
                Update Profile
              </Typography>
              <AvatarComp
                alt="Profile Photo"
                src={
                  imageUrl.profilePicture ||
                  currentUser.userDetails.profilePicture
                }
                onClick={() => fileRef.current.click()}
              />
              {/* shows image uploading progress */}
              <Box sx={{ margin: 2 }}>
                {imageError ? (
                  <Typography component="span" sx={{ color: "red" }}>
                    Error Upload Image (please upload image less than 2mb)
                  </Typography>
                ) : imagePercent > 0 && imagePercent < 100 ? (
                  <Typography component="span" sx={{ color: "green" }}>
                    {`Uploading: ${imagePercent} %`}
                  </Typography>
                ) : imagePercent === 100 ? (
                  <Typography component="span" sx={{ color: "green" }}>
                    Image uploaded Successfully
                  </Typography>
                ) : (
                  " "
                )}
              </Box>
            </Stack>
            {/* creating reference to avatar image */}
            <input
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            ></input>
            <TextField
              variant="outlined"
              placeholder="Enter your Name"
              fullWidth
              type="text"
              label="Name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ padding: "10px" }}
            />
            <TextField
              variant="outlined"
              placeholder="Enter your Email"
              fullWidth
              type="email"
              label="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ padding: "10px" }}
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
            <OutlinedInput
              placeholder="Conform Password"
              fullWidth
              id="conformPassword"
              value={conformPassword}
              onChange={(e) => setConformPassword(e.target.value)}
              type={showConformPassword ? "text" : "password"}
              sx={{ margin: "10px auto" }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowConformPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConformPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {loading ? <Loader /> : <UpdateBtn onClick={submitHandler}>Update</UpdateBtn>}
        </Wrapper>
      </Container>
  );
};

export default UpdateProfile;

