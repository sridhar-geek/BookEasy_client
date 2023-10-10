import React from "react";
import Header from "../Components/HomePage/Header";
import { Box, styled } from "@mui/material";

const Container = styled(Box)`
  margin-top: 70px;
`;
const Attractions = () => {
  return (
    <div>
      <Header />
      <Container>
        <h1>Attractions shown here</h1>
      </Container>
    </div>
  );
};

export default Attractions;
