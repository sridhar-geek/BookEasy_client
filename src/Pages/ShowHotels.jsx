import React, { useState } from 'react'
import { Box, styled, Grid } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import Header from '../Components/HomePage/Header'
import SearchComponent from '../Components/SearchComponent'

const SearchBox = styled(Box)`
  margin-top: 85px;
  z-index: 1;
  display: flex;
  justify-content: center;
`
const SortBox = styled(Box)`
  padding: 20px;
  margin: 10px;
  `

const ShowHotels = () => {
  // const [isMapOpen, setIsMapOpen] = useState(false)
  const hotelDetails = useSelector((state) => state.hotels);
  console.log({hotelDetails});

  return (
    <div>
      <Header />
      <SearchBox>
        <SearchComponent />
      </SearchBox>
      <SortBox>Total Properties and Map</SortBox>
      <Grid container spacing={2}>
        <Grid >
          
        </Grid>
        <Grid >
          
        </Grid>
      </Grid>

    </div>
  );
}

export default ShowHotels