/**This component  Navigates user to his profile page and logout user */

import React, { useState } from "react";
import { Button, Menu, MenuItem, Avatar, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

  /*Import modules from other files  */
import { delete_Logout, userActionFailure } from "../../redux/userSlice";

const User = ({ user }) => {
  const navigate = useNavigate();
  // retriewing data from user slice
  const { currentUser } = useSelector((state) => state.user);
  // handles main items to open and close
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // navigattes to profile page
  const handleProfile = () => {
    navigate("/profile");
  };
  const dispatch = useDispatch();

  // logout function
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.get(`/user/logout/${currentUser.userDetails._id}`);
      dispatch(delete_Logout());
      toast.success("user logout successful");
      navigate('/')
    } catch (error) {
      dispatch(userActionFailure(error))
      console.error(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div>
      <Tooltip title={user.userDetails.name}>
        <Avatar
          alt="Profile Photo"
          src={user.userDetails.profilePicture}
          onClick={handleClick}
        />
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default User;
