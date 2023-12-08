/** This is common  header  for only  login and signup pages  */
import { AppBar, Box, Button, Toolbar, styled } from "@mui/material";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

/* Imports  */
import Logo from "../../assests/Hotel_logo.jpeg";

// Component styles
const RightContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-right: 5%;
`;
const Backbtn = styled(Button)`
  color: white;
  background-color: orangered;
  text-transform: none;
  &:hover {
    background-color: red;
  }
`;
const Image = styled("img")`
  height: 45px;
  width: 70px;
  user-select: none;
`;
const Login_Header = () => {
  return (
    <AppBar elevation={1}>
      <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
        <Link to={"/"}>
          <Image src={Logo} alt="logo" />
        </Link>
        <RightContainer>
          <Link to={"/"}>
            <Backbtn>
              <KeyboardBackspaceIcon style={{ marginRight: "10px" }} />
              Back to Home
            </Backbtn>
          </Link>
        </RightContainer>
      </Toolbar>
    </AppBar>
  );
};

export default Login_Header;
