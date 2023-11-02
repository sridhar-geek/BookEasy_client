import React, { useState } from 'react'
import { Box, styled, Grid, Paper, Typography} from '@mui/material'
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
  display: flex;
  justify-content: space-between;
  `

const HotelCard = styled(Paper)`
  margin: 20px 60px;
`

const ShowHotels = () => {
  const hotelDetails = useSelector((state) => state.hotels);
  const places = hotelDetails.places 
  const isloaded = useSelector((state)=>state.details)

  return (
    <div>
      <Header />
      <SearchBox>
        <SearchComponent />
      </SearchBox>
      <SortBox>
        <Typography>{places.length}No of Properties</Typography>
        <Typography>Map ToggleBtn</Typography>
        <Typography>Sort</Typography>
      </SortBox>

      <Grid container spacing={2}>
        <Grid item>
          {places?.map((place, i) => (
            <HotelCard key={i} elevation={4}>
              <Hotels place={place} />
            </HotelCard>
          ))}
        </Grid>
        <Grid item></Grid>
      </Grid>
      {isloaded ? <GoogleMap /> : <div>Loading....</div>}
    </div>
  );
}

export default ShowHotels


// show 