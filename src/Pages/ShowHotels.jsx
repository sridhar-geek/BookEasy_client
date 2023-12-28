/** Show all hotels and map component */
import {
  Box,
  styled,
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

// import HotelsData from "../assests/Api Data/All_hotels.json";
/* Imported files */
import Header from "../Components/MainHeader/Header";
import SearchComponent from "../Components/SearchComponent";
import Hotels from "../Components/HotelsCard";
import MapComponent from "../Components/Google Maps/MapComponent";
//Component Styles
const SearchBox = styled(Box)`
  margin-top: 80px;
  z-index: 1;
  padding: 20px 40px;
  display: flex;
  justify-content: center;
`;
const SortBox = styled(Paper)`
  padding: 20px;
  margin: 10px 40px;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
`;

const ShowHotels = () => {
  // retriewing data from redux store
  const { places } = useSelector((state) => state.hotels);
  // const places = HotelsData.result;

  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("");

  // handles map component
  const handleDialog = () => {
    setOpen((prevState) => !prevState);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // handles sorting of hotels
  const handleChange = (event) => {
    setSort(event.target.value);
  };
  // filtering hotels 
  const filters = (arr)=> {
    let filters = [...arr]; // Create a copy of the array
    // let filteredArr = [...arr]; // Create a copy of the array
    const filteredArr = filters.filter(ele => ele.review_score >= 0)
    return filteredArr
  }
  // for sorting hotels based on price, rating and popularity
  const sortHotels = (arr) => {
    const filteredArr = filters(arr)
    if (sort === "pop") filteredArr.sort((a, b) => a.hotel_id - b.hotel_id);
    else if (sort === "asc")
      filteredArr.sort((a, b) => a.min_total_price - b.min_total_price);
    else if (sort === "desc")
      filteredArr.sort((a, b) => b.min_total_price - a.min_total_price);
    else if (sort === "ratdesc")
      filteredArr.sort((a, b) => a.review_score - b.review_score);
    else if (sort === "ratasc")
      filteredArr.sort((a, b) => b.review_score - a.review_score);

    return filteredArr;
  };

  return (
    <div>
      <Header />
      <SearchBox>
        <SearchComponent />
      </SearchBox>
      <SortBox>
        <Typography fontSize='1.1rem' fontWeight='bolder' fontFamily='Popins'>
          <span style={{ fontSize: "1.2rem"}}>
            {sortHotels(places)?.length}
          </span>{" "}
          Hotels found
        </Typography>
        <Button onClick={handleDialog} sx={{ textTransform: "capitalize" }}>
          Map View
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <MapComponent />
        </Dialog>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography mr={2}> Sort by</Typography>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select value={sort} onChange={handleChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="pop">Popularity</MenuItem>
              <MenuItem value="asc">Price low to high</MenuItem>
              <MenuItem value="desc">Price high to low</MenuItem>
              <MenuItem value="ratasc">Rating high to low</MenuItem>
              <MenuItem value="ratdesc">Rating low to high</MenuItem>
            </Select>
          </FormControl>
        </div>
      </SortBox>
      <Box display="flex" justifyContent="center">
        <Box>
          {sortHotels(places).map((place) => (
            <Paper
              key={place.hotel_id}
              sx={{ margin: "20px 60px" }}
              elevation={4}
            >
              <Hotels place={place} />
            </Paper>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default ShowHotels;




// <Grid container spacing={2}>
//   <Grid item>
//     <Typography>filters here</Typography>
//     <Typography>filters here</Typography>
//     <Typography>filters here</Typography>
//     <Typography>filters here</Typography>
//     <Typography>filters here</Typography>
//     <Typography>filters here</Typography>
//     <Typography>filters here</Typography>
//     <Typography>filters here</Typography>
//   </Grid>
//   <Grid item>
//     {sortHotels(places).map((place, i) => (
//       <Paper sx={{ margin: "20px 60px" }} elevation={4}>
//         <Hotels place={place} key={i} />
//       </Paper>
//     ))}
//   </Grid>
// </Grid>;
