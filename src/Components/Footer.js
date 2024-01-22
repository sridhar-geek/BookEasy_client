/**Serves as common footer for all the pages */

import React from "react";
import { Box, Typography, styled, Button, Grid, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

/** Import modules form another files  */
import microsoft from '../assests/Footer/microsoft.png'
// import playStore from '../assests/Footer/playstore.png'
import Logo from "../assests/Hotel_logo.jpeg";

//component styles
const Container = styled(Box)`
    background-color: #24262b;
    padding: 30px ;
`
const Image = styled("img")`
  height: 45px;
  width: 70px;
  user-select: none;
`;

const Head = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 0px 50px;
  color: white;
`;
const Heading = styled(Typography) `
  color: white;
  &::after{
    color: red;
  }
  &:hover{
    transform: scale3d(1.4)
  }
`
const SocialBtn = styled(Button)`
&:hover{
  color: white;
  transform: scale(1.5);
}
`
const Item = styled(Typography)`
  margin: 10px 0px;
  cursor: pointer;
  color: white;
  
  &:hover{
    padding-left: 20px;
  }
`
const ImageBox = styled(Box)`
  display: flex;
  margin: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const FooterImage = styled("img")`
  height: 45px;
  width: 140px;
  margin: 10px;
  user-select: none;
`;


const Footer = () => {
  return (
    <>
      <Container>
        <Head>
          <Image src={Logo} />
          <Typography variant="h5" sx={{ padding: "10px" }}>
            Travel around the world, we keep you safe
          </Typography>
        </Head>
        <Divider sx={{ margin: 2, bgcolor: "white" }} />
        <Grid container spacing={2}>
          <Grid item textAlign={"center"} xs={6} md={6} lg={3} xl={3}>
            <Heading variant="h4">About Us</Heading>
            <Item>Aim</Item>
            <Item>Who we are</Item>
            <Item>Work with us</Item>
          </Grid>
          <Grid item textAlign={"center"} xs={6} md={6} lg={3} xl={3}>
            <Heading variant="h4">For Hotels</Heading>
            <Item>Patner with us</Item>
            <Item>List Your Hotel</Item>
            <Item>Apps for You</Item>
          </Grid>
          <Grid item textAlign={"center"} xs={6} md={6} lg={3} xl={3}>
            <Heading variant="h4">Learn More</Heading>
            <Item>Privacy</Item>
            <Item>Security</Item>
            <Item>Terms</Item>
          </Grid>
          <Grid item textAlign={"center"} xs={6} md={6} lg={3} xl={3}>
            <Heading variant="h4">Social Links</Heading>
            <SocialBtn>
              <FacebookIcon />
            </SocialBtn>
            <SocialBtn>
              <InstagramIcon />
            </SocialBtn>
            <SocialBtn>
              <TwitterIcon />
            </SocialBtn>
            <SocialBtn>
              <LinkedInIcon />
            </SocialBtn>
            <ImageBox>
              {/* <FooterImage
                src={playStore}
                style={{ cursor: "pointer" }}
                alt="appStore"
              /> */}
              <FooterImage
                src={microsoft}
                style={{ cursor: "pointer" }}
                alt="playStore"
              />
            </ImageBox>
          </Grid>
        </Grid>
        <Divider sx={{ margin: 2 }} />
        <Typography sx={{ color: "white", textAlign: "center", margin: 1 }}>
          By continuing past this page, you agree to our Terms of Service,
          Cookie Policy, Privacy Policy and Content Policies. All trademarks are
          properties of their respective owners.
        </Typography>
        <Typography sx={{ color: "white", textAlign: "center" }}>
          © <span style={{ color: "orangered" }}>Book Easy™</span> Ltd. All
          rights reserved.
        </Typography>
      </Container>
    </>
  );
};

export default Footer;
