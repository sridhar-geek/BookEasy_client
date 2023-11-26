// import { useState, useEffect } from "react";
// import { useLoadScript } from "@react-google-maps/api";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// // import {
// //   Combobox,
// //   ComboboxInput,
// //   ComboboxPopover,
// //   ComboboxList,
// //   ComboboxOption,
// //   ComboboxOptionText,
// // } from "@blinq-reach/combobox";
// // import "@reach/combobox/styles.css";

// const PlacesAutoComplete = () => {
//   const { isloaded } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
//     libraries: ["places"],
//   });

//   return <div>{isloaded ? "...loading" : <Places />}</div>;
// };

// const Places = () => {
//     const {
//       ready,
//       value,
//       setValue,
//       suggestions: { status, data },
//       clearSuggestions,
//     } = usePlacesAutocomplete();

    
//   return (
// //   <Combobox>
// //     <ComboboxInput value ={value} onChange={e=> setValue(e.target.value)} disabled={!ready} placeholder='Search Destination'/>
// //  <ComboboxPopover>
// //     <ComboboxList>
// //         {status === 'OK' && data.map(({place_id, description})=> <ComboboxOption key={place_id} value= {description} />)}
// //     </ComboboxList>
// //  </ComboboxPopover>
// //   </Combobox>
// <>
// <input type="text" value={value} onChange={(e)=> setValue(e.target.value)} disabled={!ready} placeholder="Search destination" />
// </>
//   )
// }; 

// export default PlacesAutoComplete;



import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

const PlacesAutocomplete = ({ setLatitude, setLongitude }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "YOUR_CALLBACK_NAME",
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When the user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        setLatitude(lat);
        setLongitude(lng);
        // console.log("📍 Coordinates: ", { lat, lng });
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref}>
      <input
        required
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Search your destination"
        style={{ border: "none", padding: "20px", fontSize: "1.1rem" }}
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};

export default PlacesAutocomplete;