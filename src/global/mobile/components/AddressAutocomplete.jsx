import React, { useState, useRef } from "react";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";

const libraries = ["places"]; // Only load the places library

const AddressAutocomplete = () => {
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const searchBoxRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBQpjeMhtCPmT91K67sHmKIRUveCnT2yDw",
    libraries,
  });

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places.length === 0) return;

    const place = places[0];
    setAddress(place.formatted_address);
    const zipCodeComponent = place.address_components.find((component) =>
      component.types.includes("postal_code")
    );
    setZipCode(zipCodeComponent ? zipCodeComponent.long_name : "N/A");
  };

  return (
    <div>
      <h2>mobile AddressAutocomplete</h2>
      <StandaloneSearchBox
        onLoad={(ref) => (searchBoxRef.current = ref)}
        onPlacesChanged={onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Enter an address"
          style={{ width: "300px", height: "40px" }}
        />
      </StandaloneSearchBox>
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

export default AddressAutocomplete;
