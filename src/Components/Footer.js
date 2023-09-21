import React from "react";
import {
  styled,
  Box,
  Typography,
  Grid,
  List,
  ListItemText,
  ListItem,
  Divider,
} from "@mui/material";
import {Link} from 'react-router-dom'

import Logo from "../assests/Hotel_logo.jpeg";

const Container = styled(Box)`
  background-color: #24262b;
  padding: 15px;
  color: #fff;
`;

const Image = styled("img")`
  height: 45px;
  width: 70px;
  user-select: none;
`

const Head = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding:10px;
`
const Wrapper = styled(Box)`
display: flex;
justify-content: space-evenly;
`
 const FooterHead = styled(Typography)`
   &::after {
     content: "";
     position: absolute;
     left: 0;
     bottom: -10px;
     background-color: #e91e63;
     box-sizing: border-box;
     width: auto;
   }
 `;
const UnList = styled('ul')`
    text-decoration: none;
    & li{
      text-decoration: none;
    }
`


function Footer() {
  return (
    <Container>
      <Head>
        <Image src={Logo} />
        <Typography variant="h5" sx={{ padding: "10px" }}>
          Worlds leading Website with more users
        </Typography>
      </Head>
      <Divider sx={{ bgcolor: "white" }} />
      <Wrapper>
        <Grid container>
          <Grid item xs={6} md={3}>
            <Typography variant="h5">About us</Typography>
            <ul>
              <li><Link>Home</Link></li>
              <li><Link>about</Link></li>
              <li><Link>more details</Link></li>
            </ul>
          </Grid>

        </Grid>
      </Wrapper>
      {/* <Divider sx={{ bgcolor: "white" }} /> */}
      <Typography variant="subtitle1">
        By continuing past this page, you agree to our Terms & Conditions,
        Cookie Policy, Privacy Policy and Content Policies. © Hotel Booking Ltd.
        All rights reserved.
      </Typography>
    </Container>
  );
}

export default Footer;
