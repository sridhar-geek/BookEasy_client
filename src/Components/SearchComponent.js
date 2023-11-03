import { useState, useEffect, useRef, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  styled,
  Box,
  Grid,
  Menu,
  Button,
  Typography,
} from "@mui/material";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import format from "date-fns/format";

import BedIcon from "@mui/icons-material/Bed";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

/* Imported files */
import { getApiData } from "../api/getHotels";
import { getHotelData, gettingDetails } from "../redux/SearchSlice";
import {sotreDetails} from '../redux/DetailsSlice'
import Loader from "./Loader";

const ACTIONS = {
  RM_IN: "room increment",
  RM_DC: "room decrement",
  AD_IN: "adults increment",
  AD_DC: "adults decrement",
  CH_IN: "children increment",
  CH_DC: "children decrement",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.RM_IN:
      if (state.rooms < 10) return { ...state, rooms: state.rooms + 1 };
      else return{...state}
    case ACTIONS.RM_DC:
      if (state.rooms > 1) return { ...state, rooms: state.rooms - 1 };
      else return{...state}
    case ACTIONS.AD_IN:
      if (state.adults < 10) return { ...state, adults: state.adults + 1 };
      else return{...state}
    case ACTIONS.AD_DC:
      if (state.adults > 1) return { ...state, adults: state.adults - 1 };
      else return{...state}
    case ACTIONS.CH_IN:
      if (state.children < 15)
        return { ...state, children: state.children + 1 };
      else return{...state}
    case ACTIONS.CH_DC:
      if (state.children > 0) return { ...state, children: state.children - 1 };
      else return{...state}
    default:
      return {...state };
  }
};

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
`;
const SelectPeople = styled("input")`
  cursor: pointer;
  border: none;
`;
const Items = styled(Box)`
  width: 350px;
  display: flex;
  justify-content: space-between;
`;
const SearchBtn = styled(Button)`
  background-color: orangered;
  padding: 10px;
  color: white;
  &:hover {
    background-color: red;
  }
`;

const SearchComponent = () => {
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();
  //calender component
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

  const [state, reduceFtn] = useReducer(reducer, {
    rooms: 1,
    adults: 1,
    children: 0,
  });

  // storing all hotel details in redux global store
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.hotels);
  const latitude = 17.68;
  const longitude = 83.2;
  const handleSumbit = async (e) => {
    e.preventDefault();
    dispatch(gettingDetails());
   
    const data = await getApiData(
      `hotels/list-by-latlng?latitude=${latitude}&longitude=${longitude}`
    );
    dispatch(getHotelData(data));
    dispatch(sotreDetails(state))
    navigate("/hotels");
  };

  return (
    <Container container spacing={2}>
      <Individual item xs={8} md={6} lg={4}>
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
          value={`${state.rooms}Rooms ${state.adults}Adults ${state.children}Children`}
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
              <Button
                variant="outlined"
                onClick={() => reduceFtn({ type: ACTIONS.RM_IN })}
              >
                +
              </Button>
              {state.rooms}
              <Button
                variant="outlined"
                onClick={() => reduceFtn({ type: ACTIONS.RM_DC })}
              >
                -
              </Button>
            </Box>
          </Items>
          <Items>
            <Typography>Adults</Typography>
            <Box>
              <Button onClick={() => reduceFtn({ type: ACTIONS.AD_IN })}>
                +
              </Button>
              {state.adults}
              <Button onClick={() => reduceFtn({ type: ACTIONS.AD_DC })}>
                -
              </Button>
            </Box>
          </Items>
          <Items>
            <Typography>Children</Typography>
            <Box>
              <Button onClick={() => reduceFtn({ type: ACTIONS.CH_IN })}>
                +
              </Button>
              {state.children}
              <Button onClick={() => reduceFtn({ type: ACTIONS.CH_DC })}>
                -
              </Button>
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
