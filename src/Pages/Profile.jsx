/**This page shows user details and bookings and also provide delete functionality */

import React, { useState } from "react";

import {
  Box,
  styled,
  ListItem,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast } from "react-toastify";

/**Import modules from anthor files */
import Header from "../Components/MainHeader/Header";
import UpdateUser from "../Components/User Profile/UpdateUser";
import MyBookings from "../Components/User Profile/MyBookings";
import {
  userActionStart,
  delete_Logout,
  userActionFailure,
} from "../redux/userSlice";
import Loader from "../Components/Loader";
import { useNavigate } from "react-router-dom";

//component Styles
const Container = styled(Paper)`
  margin-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 7%;
  margin-right: 7%;
  margin-bottom: 20px;
`;
const LeftBox = styled(Box)`
  margin-right: 2%;
  background-color: #f4bef2;
  height: 75vh;
`;
const RightBox = styled(Paper)`
  margin-left: 2%;
`;
const DeleteBtn = styled(Button)`
  background-color: red;
  color: white;
  padding: 10px;
  border-radius: 10px;
  &:hover {
    background-color: #ba2b43;
  }
`;
const NoBtn = styled(Button)`
  background-color: #7be67b;
  color: white;
  padding: 10px;
  border-radius: 10px;
  &:hover {
    background-color: #203e20;
  }
`;

const Profile = () => {
  //shows update user, bookings and delete user onClick
  const [updateUser, setUpdateUser] = useState(true);
  const [open, setOpen] = useState(false);
 const Navigate = useNavigate();

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const hanleProfile = () => {
    setUpdateUser(true);
  };

  const handleBookings = () => {
    setUpdateUser(false);
  };
  // retriew data from userSlice
  const { currentUser } = useSelector((state) => state.user);
  const {loading, error} = useSelector((state)=> state.user)
  const dispatch = useDispatch();
  // delete account
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      dispatch(userActionStart());
      const data = await axios.delete(
        `/user/${currentUser.userDetails._id}`
      );
      dispatch(delete_Logout());
      Navigate('/')
    } catch (err) {
      dispatch(userActionFailure(err));
      toast.error(err.response.data.msg);
      console.log(err)
    }
  };
  return (
    <div>
      <Header />
      <Container elevation={6}>
        <LeftBox>
          <List>
            <ListItem>
              <ListItemButton onClick={hanleProfile}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={handleBookings}>
                <ListItemIcon>
                  <AllInboxIcon />
                </ListItemIcon>
                <ListItemText primary="My bookings" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemButton onClick={handleDeleteClick}>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText primary="Delete Account" />
              </ListItemButton>
            </ListItem>
          </List>
        </LeftBox>
        <RightBox>
          {updateUser ? <UpdateUser /> : <MyBookings />}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to Delete your account?"}
            </DialogTitle>
            <DialogActions
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              {loading ? (
                <Loader />
              ) : (
                <DeleteBtn onClick={handleDelete}>Yes</DeleteBtn>
              )}
              <NoBtn onClick={handleClose}>No</NoBtn>
            </DialogActions>
          </Dialog>
        </RightBox>
      </Container>
    </div>
  );
};

export default Profile;
