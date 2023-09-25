import React from "react";
import { Box, Typography, styled, Button } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Logo from "../assests/Hotel_logo.jpeg";
import "./Footer.css";

const Container = styled(Box)`
    background-color: #24262b;
    padding: 70px 0;
`
const Image = styled("img")`
  height: 45px;
  width: 70px;
  user-select: none;
`;

const Head = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  color: white;
`;
const SocialBtn = styled(Button)`
&:hover{
  color: white;
  transform: scale(1.3);
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
        <div className="container">
          <div className="row">
            <div className="footer-col">
              <h4>company</h4>
              <ul>
                <li>
                  <a href="#">about us</a>
                </li>
                <li>
                  <a href="#">our services</a>
                </li>
                <li>
                  <a href="#">privacy policy</a>
                </li>
                <li>
                  <a href="#">affiliate program</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>get help</h4>
              <ul>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">shipping</a>
                </li>
                <li>
                  <a href="#">returns</a>
                </li>
                <li>
                  <a href="#">order status</a>
                </li>
                <li>
                  <a href="#">payment options</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>online shop</h4>
              <ul>
                <li>
                  <a href="#">watch</a>
                </li>
                <li>
                  <a href="#">bag</a>
                </li>
                <li>
                  <a href="#">shoes</a>
                </li>
                <li>
                  <a href="#">dress</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>follow us</h4>
              <div className="social-links">
                <SocialBtn>
                  <FacebookIcon />
                </SocialBtn>
                <SocialBtn>
                  <TwitterIcon />
                </SocialBtn>
                <SocialBtn>
                  <InstagramIcon />
                </SocialBtn>
                <SocialBtn>
                  <LinkedInIcon />
                </SocialBtn>
              </div>
            </div>
          </div>
        </div>
        <Typography variant="subtitle1" sx={{ color: "white" }}>
          By continuing past this page, you agree to our Terms & Conditions,
          Cookie Policy, Privacy Policy and Content Policies. © Hotel Booking
          Ltd. All rights reserved.
        </Typography>
      </Container>
    </>
  );
};

export default Footer;
