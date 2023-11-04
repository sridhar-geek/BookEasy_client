import {
  Box,
  styled,
  Grid,
  Paper,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Dialog,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";


/* Imported files */
import Header from "../Components/HomePage/Header";
import SearchComponent from "../Components/SearchComponent";
import Hotels from "../Components/HotelsCard";
import MapComponent from "../Components/MapComponent";
//Component Styles
const SearchBox = styled(Box)`
  margin-top: 80px;
  z-index: 1;
  padding: 20px 40px;
`;
const SortBox = styled(Paper)`
  padding: 20px;
  margin: 10px 40px;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
`;

const HotelCard = styled(Paper)`
  margin: 20px 60px;
`;

const ShowHotels = () => {
  const hotelDetails = useSelector((state) => state.hotels);
  const places = hotelDetails.places;

  const [open, setOpen] = useState(false)
  const [sort, setSort] = useState("");

  const handleDialog = ()=> {
    setOpen((prevState)=> !prevState)
  }
  const handleClose = ()=> {
    setOpen(false)
  }
  const handleChange = (event) => {
    setSort(event.target.value);
  };
  return (
    <div>
      <Header />
      <SearchBox>
        <SearchComponent />
      </SearchBox>
      <SortBox>
        <Typography>{places?.length} Hotels found</Typography>
        <Button onClick={handleDialog}>Map View</Button>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <MapComponent />
        </Dialog>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography mr={2}> Sort by</Typography>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select value={sort} onChange={handleChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Popularity</MenuItem>
              <MenuItem value={20}>Price high to low</MenuItem>
              <MenuItem value={30}>Price low to high</MenuItem>
            </Select>
          </FormControl>
        </div>
      </SortBox>

      <Grid container spacing={2}>
        <Grid item>
          {/* {places?.map((place, i) => (
            <HotelCard key={i} elevation={4}>
              <Hotels place={place} />
            </HotelCard>
          ))} */}
          <Hotels />
        </Grid>
        <Grid item></Grid>
      </Grid>
    </div>
  );
};

export default ShowHotels;

// show
