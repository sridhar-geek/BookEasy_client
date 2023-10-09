import React, {useState} from "react";
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
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import DeleteIcon from "@mui/icons-material/Delete";

import UpdateUser from "../Components/UpdateUser";
import MyBookings from "../Components/MyBookings";

//component Styles 
const Container = styled(Paper)`
  margin-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 7%;
  margin-right: 7%;
  margin-bottom: 20px;
`
const LeftBox = styled(Box)`
  margin-right: 2%;
  background-color: #f4bef2;
  height: 75vh;
`
const RightBox = styled(Paper)`
  margin-left: 2%;
`

const Profile = () => {
  const [updateUser, setUpdateUser] = useState(true)

  const hanleProfile = ()=> {
    setUpdateUser(true)
  }

  const handleBookings = ()=> {
    setUpdateUser(false)
  }
  return (
    <div>
      <Header />
      <Container elevation={6}>
        <LeftBox >
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
              <ListItemButton>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText primary="Delete Account" />
              </ListItemButton>
            </ListItem>
          </List>
        </LeftBox>
        <RightBox >
          {updateUser ? <UpdateUser /> : <MyBookings />}
        </RightBox>
      </Container>
    </div>
  );
};

export default Profile;

{
  /* <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar> */
}
