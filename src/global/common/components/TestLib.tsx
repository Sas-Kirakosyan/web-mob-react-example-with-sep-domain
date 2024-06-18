//@ts-nocheck
import { useEffect, useState } from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

const TestLib = () => {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: "AIzaSyBQpjeMhtCPmT91K67sHmKIRUveCnT2yDw",
  });
  const [state, savePlaceDetailsToState] = useState("");
  console.log({ placePredictions });
  useEffect(() => {
    // fetch place details for the first element in placePredictions array
    if (placePredictions.length)
      placesService?.getDetails(
        {
          placeId: placePredictions[0].place_id,
        },
        (placeDetails) => savePlaceDetailsToState(placeDetails)
      );
  }, [placePredictions]);
  console.log({ state });
  return (
    <>
      <input
        placeholder="Debounce 500 ms"
        onChange={(evt) => {
          console.log({ evt });
          getPlacePredictions({ input: evt.target.value });
        }}
        loading={isPlacePredictionsLoading}
      />
      {placePredictions.map((item) => item)}
    </>
  );
};

export default TestLib;
