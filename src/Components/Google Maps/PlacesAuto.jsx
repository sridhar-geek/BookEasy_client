// /**Google AutoComplete   */
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
//  /* Imports from other files */
import { setLatitude, setLongitude } from "../../redux/DetailsSlice";

const PlacesAutocomplete = ({setDestination}) => {
  const dispatch = useDispatch()
   // use placeautocomplete hook
  const {
    ready,
    value,
    suggestions: { data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300 });

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
      dispatch(setLatitude(lat));
      dispatch(setLongitude(lng));
    });
  };
  return (
    <>
      <Autocomplete
        id="autocomplete"
        freeSolo
        aria-required
        options={data}
        sx={{ width: 300 }}
        getOptionLabel={(option) => option.description}
        onInputChange={(event, newValue) => {
          handleInput({ target: { value: newValue } });
        }}
        onChange={(event, newValue) => {
          if (newValue) {
            console.log(newValue)
            handleSelect(newValue.description);
            setDestination(newValue.description)
          } else setDestination(false)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search your destination"
            variant="outlined"
            disabled={!ready}
            required={true}
          />
        )}
      />
    </>
  );
};

export default PlacesAutocomplete;
