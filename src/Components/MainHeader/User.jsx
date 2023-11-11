/**This component  Navigates user to his profile page and logout user */

import React, { useState } from "react";
import { Button, Menu, MenuItem, Avatar, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

  /*Import modules from other files  */
import { logout } from "../../redux/userSlice";

const User = ({ user }) => {
  const Navigate = useNavigate();
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
    Navigate("/profile");
  };
  const dispatch = useDispatch();

  // logout function
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.get("http://localhost:5000/api/auth/logout");
      dispatch(logout());
      toast.success("user logout successful");
    } catch (error) {
      console.error(error);
      toast.error("logout failed");
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

