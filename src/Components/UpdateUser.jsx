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

/**Imports components from another files */
import Header from "../Components/HomePage/Header";
import { app } from "./firebase";

// Component styles
const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled(Paper)`
  max-width: 600px;
  min-width: 500px;
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
  margin: 10, auto;
  cursor: pointer;
`;

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");

  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [imageUrl, setImageUrl] = useState({});
  console.log(imagePercent);
  console.log(imageUrl);
  useEffect(() => {
    if (image) handleFileUpload(image);
  }, [image]);

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

  const dispatch = useDispatch();
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

  const submitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <Container>
        <Wrapper>
          <form onSubmit={submitHandler}>
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
            {imageError ? (
              <Typography component="span" sx={{ color: "red" }}>
                Error Upload Image (please upload image less than 2mb)
              </Typography>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <Typography component="span" sx={{ color: "green" }}>
                {`Uploading: ${imagePercent} %`}
              </Typography>
            ) : imagePercent == 100 ? (
              <Typography component="span" sx={{ color: "green" }}>
                Image uploaded Successfully
              </Typography>
            ) : (
              " "
            )}
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
            <UpdateBtn type="submit">Update</UpdateBtn>
          </form>
        </Wrapper>
      </Container>
    </>
  );
};

export default UpdateProfile;
