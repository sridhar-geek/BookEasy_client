import React, { useState } from "react";
import { Button, Menu, MenuItem, Avatar, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

import { logout } from "../redux/userSlice";
import { toast } from "react-toastify";

const User = ({ user }) => {
  const Navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    Navigate("/profile");
  };
  const dispatch = useDispatch();

  // user logout
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.get("/api/auth/logout");
      dispatch(logout());
      toast.success("user logout successful");
    } catch (error) {
      console.log(error);
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

// logouts user and navigate to user profile
