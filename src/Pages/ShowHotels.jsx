import React from 'react'
import { Box, styled, Grid, Paper } from '@mui/material'
import { useSelector } from 'react-redux'

/* Imported files */
import Header from '../Components/HomePage/Header'
import SearchComponent from '../Components/SearchComponent'
import Hotels from '../Components/HotelsCard'
import GoogleMap from '../Components/GoogleMap'

//Component Styles
const SearchBox = styled(Box)`
  margin-top: 80px;
  z-index: 1;
  padding: 20px 40px;
`
const SortBox = styled(Box)`
  padding: 20px;
  margin: 10px;
  `

const HotelCard = styled(Paper)`
  margin: 20px 60px;
  /* min-width: 200px;
  width: 50%; */
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
`

const ShowHotels = () => {
  // const [isMapOpen, setIsMapOpen] = useState(false)
  const hotelDetails = useSelector((state) => state.hotels);
  const places = hotelDetails.places 

  return (
    <div>
      <Header />
      <SearchBox>
        <SearchComponent />
      </SearchBox>
      <SortBox> Map and Sort </SortBox>
      <Box>{places.length}No of Properties</Box>
      <Grid container spacing={2}>
        <Grid item>
          {places?.map((place, i) => (
            <HotelCard key={i} elevation={4}>
              <Hotels place={place} />
            </HotelCard>
          ))}
          {/* <HotelCard elevation={5}>
            <Hotels />
          </HotelCard> */}
        </Grid>
        <Grid item>
          <GoogleMap />
        </Grid>
      </Grid>
    </div>
  );
}

export default ShowHotels


// show 