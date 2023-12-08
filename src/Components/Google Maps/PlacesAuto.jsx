/**Google AutoComplete   */
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useDispatch } from "react-redux";
import { Grid, styled } from "@mui/material";
import BedIcon from "@mui/icons-material/Bed";
 /* Imports from other files */
 import {setLatitude, setLongitude} from '../../redux/DetailsSlice'
//Component styles
const Individual = styled(Grid)`
  display: flex;
  align-items: center;
  padding: 2px;
  justify-content: space-around;
  border: 3px solid orangered;
  position: relative;
  min-width: 400px;
`;

const PlacesAutocomplete = () => {
  const dispatch = useDispatch()
  // use placeautocomplete hook
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300 });

  // clears suggestions when user click out of the component
  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });
  // Update the keyword of the input element
  const handleInput = (e) => {
    setValue(e.target.value);
  };

  // When the user selects a place, we can replace the keyword without request data from API
  // by setting the second parameter to "false"
  const handleSelect = (description) => {
    setValue(description, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions and store them in redux store
    getGeocode({ address: description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      dispatch(setLatitude(lat))
      dispatch(setLongitude(lng))
    });
  };

  return (
    <div ref={ref}>
      <Combobox>
        <Individual
          item
          xs={8}
          md={6}
          lg={4}
          style={{ padding: "16px 2px 2px 16px" }}
        >
          <BedIcon />
            <ComboboxInput
              value={value}
              required
              onChange={handleInput}
              disabled={!ready}
              placeholder="Search your destination"
              style={{ border: "none", padding: "20px", fontSize: "1.1rem" }}
            />
        </Individual>
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption
                  key={place_id}
                  value={description}
                  onMouseDown={() => handleSelect(description)}
                />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default PlacesAutocomplete;
