/**This component  Navigates user to his profile page and logout user */

import React, { useState } from "react";
import { Menu, MenuItem, Avatar, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

/*Import modules from other files  */
import {
  delete_Logout,
  userActionFailure,
  userActionStart,
} from "../../redux/userSlice";
import Loader from "../Loader";

const User = ({ user }) => {
  const navigate = useNavigate();
  // retriewing data from user slice
  const { currentUser, loading } = useSelector((state) => state.user);
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
      dispatch(userActionStart())
      await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/user/logout/${currentUser.userDetails._id}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      dispatch(delete_Logout());
      toast.success("Logout successful");
      navigate("/");
    } catch (error) {
      dispatch(userActionFailure(error));
      toast.error(error.response?.data?.msg);
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
      {loading ? (
        <Loader open={loading} />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default User;
