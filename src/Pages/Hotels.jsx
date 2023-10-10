import React from 'react'
import Header from '../Components/HomePage/Header'
import { Box, styled } from '@mui/material'

const Container = styled(Box)`
  margin-top: 70px;
`
const ShowHotels = () => {
  return (
    <div>
      <Header />
      <Container>
        <h1>Hotels shown here</h1>
      </Container>
    </div>
  )
}

export default ShowHotels