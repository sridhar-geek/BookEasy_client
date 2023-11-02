import { useState, useEffect, useRef, useReducer } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { styled, Box, Grid, Menu, Button, MenuItem, Typography } from "@mui/material";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import format from "date-fns/format";
import { Autocomplete } from "@react-google-maps/api";


import BedIcon from "@mui/icons-material/Bed";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

/* Imported files */
import { getHotels } from "../api/getHotels";
import {getHotelData, gettingDetails } from '../redux/SearchSlice'
import Loader from "./Loader";

//Component Styles
const Container = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Individual = styled(Grid)`
  display: flex;
  align-items: center;
  padding: 2px;
  justify-content: space-around;
  border: 3px solid orangered;
  position: relative;
  min-width: 400px;
`;
const Calender = styled(Box)`
position: absolute;
top: 50px;
z-index: 2;
`
const SelectPeople = styled('input')`
cursor: pointer;
border: none;
`
const Items = styled(Box)`
width: 350px;
display: flex;
justify-content: space-between;
`
const SearchBtn = styled(Button)`
  background-color: orangered;
  padding: 10px;
  color: white;
  &:hover{
    background-color: red;
  }
`

const SearchComponent = () => {
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  // handling calenderbox
  const reference = useRef(null);
  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnOutsideClick, true);
  }, [range]);

  // closes calender when press escape key
  const hideOnEscape = (e) => {
    if (e.key === "Escape") setOpenDate(false);
  };
  // closes calender when press outside calender box
  const hideOnOutsideClick = (e) => {
    if (reference.current && !reference.current.contains(e.target))
      setOpenDate(false);
  };

  // for adding adults and childeren in input
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const increseRooms = () => {
    if (rooms < 11) setRooms((prestate) => prestate + 1);
  };
  const decreseRooms = () => {
    if (rooms > 1) setRooms((prestate) => prestate - 1);
  };
  const addAdults = () => {
    if (adults < 11) setAdults((prestate) => prestate + 1);
  };
  const removeAdults = () => {
    if (adults > 1) setAdults((prestate) => prestate - 1);
  };
  const addChildren = () => {
    if (children < 20) setChildren((prestate) => prestate + 1);
  };
  const removeChildren = () => {
    if (children > 0) setChildren((prestate) => prestate - 1);
  };

  // storing all hotel details in redux global store
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.hotels);

  const handleSumbit = async (e) => {
    e.preventDefault();
    dispatch(gettingDetails());
    // console.log("call api");
    const data = await getHotels();
    // console.log("got response");
    dispatch(getHotelData(data));
    navigate("/hotels");
  };

  return (
    <Container container spacing={2}>
      <Individual item xs={8} md={6} lg={4}>
        <BedIcon />
        {/* <Autocomplete> */}
          <input
            type="text"
            required
            placeholder="Where are you going..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            style={{ border: "none", padding: "20px", fontSize: "1.1rem" }}
          />
        {/* </Autocomplete> */}
      </Individual>
      <Individual item xs={8} md={6} lg={4}>
        <CalendarMonthIcon />
        <input
          type="text"
          value={`${format(range[0].startDate, "ccc-dd-MMM")}  to ${format(
            range[0].endDate,
            "ccc-dd-MMM"
          )}`}
          readOnly
          placeholder="Check-in-Date  Check-out-date"
          onClick={() => setOpenDate((prestate) => !prestate)}
          style={{ border: "none", padding: "20px", fontSize: "1.1rem" }}
        />
        <Calender ref={reference}>
          {openDate && (
            <DateRange
              onChange={(item) => setRange([item.selection])}
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              ranges={range}
              months={2}
              direction="horizontal"
              minDate={new Date()}
            />
          )}
        </Calender>
      </Individual>
      <Individual item xs={8} md={6} lg={4}>
        <PeopleAltIcon />
        <SelectPeople
          type="text"
          onClick={handleClick}
          readOnly
          value={`${rooms}Rooms ${adults}Adults ${children}Children`}
          style={{ border: "none", padding: "20px", fontSize: "1.1rem" }}
        />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Items>
            <Typography>Room</Typography>
            <Box>
              <Button onClick={increseRooms}>+</Button>
              {rooms}
              <Button onClick={decreseRooms}>-</Button>
            </Box>
          </Items>
          <Items>
            <Typography>Adults</Typography>
            <Box>
              <Button onClick={addAdults}>+</Button>
              {adults}
              <Button onClick={removeAdults}>-</Button>
            </Box>
          </Items>
          <Items>
            <Typography>childeren</Typography>
            <Box>
              <Button onClick={addChildren}>+</Button>
              {children}
              <Button onClick={removeChildren}>-</Button>
            </Box>
          </Items>
        </Menu>
        {loading ? (
          <Loader open={loading} />
        ) : (
          <SearchBtn onClick={handleSumbit}>Search</SearchBtn>
        )}
      </Individual>
    </Container>
  );
};

export default SearchComponent;

