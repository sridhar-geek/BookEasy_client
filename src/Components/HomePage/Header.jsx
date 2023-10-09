import { AppBar, Box, Toolbar, styled } from '@mui/material'
import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import Logo from '../../assests/Hotel_logo.jpeg'
import Login_Singup from '../LoginBtn';


// const liveLocation =  navigator.geolocation.getCurrentPosition( )
const Container = styled(AppBar)`
/* background: transparent */
`;
const RightContainer = styled(Box)`
    display: flex;
    justify-content: space-between;
    margin-right: 5%;
`
const Wrapper = styled(Toolbar)`
    display: flex;
    justify-content: space-between;
`
const LocationBox = styled(Box)`
    display: flex;
    flex-direction: column;
    margin-left: 30px;
`
const Image = styled('img')`
  height: 45px;
  width: 70px;
  user-select: none;
`
const Header = () => {
  return (
    <Container elevation={1}>
      <Wrapper>
        <Link to={"/"}>
          <Image src={Logo} alt="logo" />
        </Link>
        <RightContainer>
          <Login_Singup />
          <LocationBox>
            <LocationOnIcon sx={{ marginLeft: "20px" }} />
            Visakhapatnam
          </LocationBox>
        </RightContainer>
      </Wrapper>
    </Container>
  );
}

export default Header



