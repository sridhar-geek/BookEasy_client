import React from "react";
import { Box, Typography, styled, Button, Grid, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Logo from "../assests/Hotel_logo.jpeg";

const Container = styled(Box)`
    background-color: #24262b;
    padding: 30px 30px;

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
const SocialBtn = styled(Button)`
&:hover{
  color: white;
  transform: scale(1.3);
}
`
const Item = styled(Typography)`
  margin: 10px 0px;
  
  &:hover{
    padding-left: 10px;
  }
`

const Footer = () => {
  return (
    <>
      <Container>
        <Head>
          <Image src={Logo} />
          <Typography variant="h5" sx={{ padding: "10px" }}>
            Worlds leading Website with more users
          </Typography>
        </Head>
        <Divider />
        <Grid container spacing={2}>
          <Grid item textAlign={"center"} xs={6} md={6} lg={3} xl={3} >
            <Typography variant="h4">
              Company
            </Typography>
            <Item>Abougt us</Item>
            <Item>Company</Item>
            <Item>Nothing</Item>
          </Grid>
          <Grid item textAlign={"center"} xs={6} md={6} lg={3} xl={3} >
            <Typography variant="h4">
              Company
            </Typography>
            <Item>Abougt us</Item>
            <Item>Company</Item>
            <Item>Nothing</Item>
          </Grid>
          <Grid item textAlign={"center"} xs={6} md={6} lg={3} xl={3} >
            <Typography variant="h4">
              Company
            </Typography>
            <Item>Abougt us</Item>
            <Item>Company</Item>
            <Item>Nothing</Item>
          </Grid>
          <Grid item textAlign={"center"} xs={6} md={6} lg={3} xl={3} >
            <Typography variant="h4">
              Company
            </Typography>
            <Item>Abougt us</Item>
            <Item>Company</Item>
            <Item>Nothing</Item>
          </Grid>
        </Grid>
        <Typography sx={{ color: "white" }}>
          By Clicking this you agreed to policy
        </Typography>
      </Container>
    </>
  );
};

export default Footer;
