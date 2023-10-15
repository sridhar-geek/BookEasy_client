import { useState, useEffect, useRef } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { styled, Box, MenuItem, Grid, Menu, Button } from "@mui/material";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import format from "date-fns/format";

import BedIcon from "@mui/icons-material/Bed";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { getHotels } from "../api/getHotels";
import {getHotelData, gettingDetails } from '../redux/SearchSlice'
import Loader from "./Loader";

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
  const navigate = useNavigate()
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
  }, []);

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

  // submitting data to hotel api
  const dispatch = useDispatch()
  const loading  = useSelector((state) => state.hotels);
  console.log({loading})
  const handleSumbit = async(e)=> {
    e.preventDefault();
    console.log("loading start")
    dispatch(gettingDetails())
    const data = await getHotels();
    console.log('api call made')
    dispatch(getHotelData(data))
    console.log("hotel data is exported")
    navigate("/hotels");
    console.log("navigate to hotels page")

  }
  return (
        <Container container spacing={2}>
          <Individual xs={8} md={6} lg={4}>
            <BedIcon />
            <input
              type="text"
              required
              placeholder="Where are you going..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              style={{ border: "none", padding: "20px", fontSize: "1.1rem" }}
            />
          </Individual>
          <Individual xs={8} md={6} lg={4}>
            <CalendarMonthIcon />
            <input
              type="text"
              value={`${format(range[0].startDate, "dd/MM/yyyy")} to ${format(
                range[0].endDate,
                "dd/MM/yyyy"
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
          <Individual xs={8} md={6} lg={4}>
            <PeopleAltIcon />
            <input
              type="text"
              onClick={handleClick}
              readOnly
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
              <MenuItem onClick={handleClose}>Adults</MenuItem>
              <MenuItem onClick={handleClose}>Children</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
            <SearchBtn onClick={handleSumbit}>Search</SearchBtn>
          </Individual>
        </Container>
  );
};

export default SearchComponent;
