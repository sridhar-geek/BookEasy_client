import React, { useState } from "react";
import Header from "../Components/HomePage/Header";
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

import UpdateUser from "../Components/UpdateUser";
import MyBookings from "../Components/MyBookings";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../redux/userSlice";

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
  const [updateUser, setUpdateUser] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
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
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      dispatch(deleteUserStart());
      const data = await axios.delete(
        `/api/user/${currentUser.userDetails._id}`
      );
      dispatch(deleteUserSuccess(data.data));
    } catch (error) {
      toast.error("Something went wrong, Please try again later");
      dispatch(deleteUserFailure(error));
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
              <ListItemButton onClick={handleClickOpen}>
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
              <DeleteBtn onClick={handleDelete}>Yes</DeleteBtn>
              <NoBtn onClick={handleClose}>No</NoBtn>
            </DialogActions>
          </Dialog>
        </RightBox>
      </Container>
    </div>
  );
};

export default Profile;
