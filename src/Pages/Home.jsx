import React from 'react'
import { Box, Grid, styled, Card, CardContent, CardMedia, CardActionArea, Typography } from '@mui/material'

import Banner_Image from '../assests/Website Main Image.jpg'
import { cardAttraction, cardHotel } from '../assests/ImageUrl'
import Header from '../Components/HomePage/Header'
import Footer from '../Components/Footer'

const PaddingBox = styled(Box)`
  padding:38px;
`
const Image = styled('img')`
  height: 90vh;
  width: 100%;
`
const ContentBox = styled(Box)`
  z-index: 3;
`
const CardHover = styled(Card)`
  max-width: 400px;
  &:hover {
    transform: scaleY(1.1);
    box-shadow: 10px 10px 5px gray;
  }
`;
const Home = () => {
  return (
    <div>
      <Header />
      <Box>
        <Image src={Banner_Image} alt="Welcome image" />
        <ContentBox>this is written on image</ContentBox>
      </Box>
      <PaddingBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <CardHover>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="160"
                  image={cardHotel}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Show all Hotels in Visakhapatnam
                  </Typography>
                </CardContent>
              </CardActionArea>
            </CardHover>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <CardHover>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={cardAttraction}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Show all Famous Tourists places in Visakhapatnam
                  </Typography>
                </CardContent>
              </CardActionArea>
            </CardHover>
          </Grid>
        </Grid>
      </PaddingBox>
      <Footer />
    </div>
  );
}

export default Home


