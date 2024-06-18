//@ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import AutocompleteOptions from "./AutoComplate";

interface Suggestion {
  description: string;
  place_id: string;
}

const Test: React.FC = () => {
  const [address, setAddress] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const inputRef: any = useRef(null);

  useEffect(() => {
    (async () => {
      const {
        AutocompleteService,
        PlacesService,
        PlacesServiceStatus,
        AutocompleteSuggestion,
        AutocompleteSessionToken,
      } = (await google.maps.importLibrary(
        "places"
      )) as google.maps.PlacesLibrary;

      const input = inputRef.current;
      if (!input) return;

      // const request = {
      //   input: "Tadi",
      //   locationRestriction: {
      //     west: -122.44,
      //     north: 37.8,
      //     east: -122.39,
      //     south: 37.78,
      //   },
      //   origin: { lat: 37.7893, lng: -122.4039 },
      //   includedPrimaryTypes: ["restaurant"],
      //   language: "en-US",
      //   region: "us",
      // };
      const token = new AutocompleteSessionToken();
      // Add the token to the request.
      // @ts-ignore
      // request.sessionToken = token;
      const autocompleteService = new AutocompleteService();
      // const { suggestions } =
      //   await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);

      input.addEventListener("input", () => {
        const inputValue = input.value;
        console.log(input.value);
        if (!inputValue) {
          setSuggestions([]);
          return;
        }

        autocompleteService.getPlacePredictions(
          { input: inputValue },
          (
            predictions: google.maps.places.AutocompletePrediction[],
            status: google.maps.places.PlacesServiceStatus
          ) => {
            if (status === PlacesServiceStatus.OK && predictions) {
              setSuggestions(predictions);
            }
          }
        );
      });
    })();
  }, []);

  const handleSelect = (suggestion: Suggestion) => {
    setAddress(suggestion.description);
    setSuggestions([]);

    const { place_id } = suggestion;

    (async () => {
      const { PlacesService } = (await google.maps.importLibrary(
        "places"
      )) as google.maps.PlacesLibrary;
      const placesService = new PlacesService(document.createElement("div"));

      placesService.getDetails({ placeId: place_id }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const zipCodeComponent = place.address_components?.find((component) =>
            component.types.includes("postal_code")
          );
          const zipCode = zipCodeComponent ? zipCodeComponent.long_name : "N/A";
          setZipCode(zipCode);
          setAddress(place.formatted_address || suggestion.description);
          if (inputRef.current) {
            inputRef.current.value =
              place.formatted_address || suggestion.description;
          }
        }
      });
    })();
  };
  console.log({ suggestions });
  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter an address"
        style={{ width: "300px", height: "40px" }}
      />
      {suggestions.length > 0 && (
        <AutocompleteOptions
          suggestions={suggestions}
          onSelect={handleSelect}
        />
      )}
      {address && (
        <div>
          <strong>Selected Address:</strong> {address}
        </div>
      )}
      {zipCode && (
        <div>
          <strong>ZIP Code:</strong> {zipCode}
        </div>
      )}
    </div>
  );
};

export default Test;
