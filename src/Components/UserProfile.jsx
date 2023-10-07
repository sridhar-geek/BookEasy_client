import React from "react";
import { styled, Button, Menu, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate} from 'react-router-dom'
import { useLogoutMutation } from "../Slice/userApiSlice";
import { logout } from "../Slice/auth";
import { toast } from "react-toastify";

const UserBtn = styled(Button)`
    background-color: orangered;
    color: white;
    text-transform: capitalize;
    border-radius: 10px;
    &:hover{
        background-color: red;
    }

`

const UserProfile =()=> {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutApiCall ] = useLogoutMutation()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutHandler = async ()=>{
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/')
      toast.success('Logout sucessful')
    } catch (error) {
      console.log(error)
    }
  }
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div>
      <UserBtn
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {userInfo.user}
      </UserBtn>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default UserProfile