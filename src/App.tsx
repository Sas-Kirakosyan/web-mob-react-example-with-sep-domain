import React, { useState, useEffect } from "react";

import Test from "./dev/components/Test";

import AddressAutocomplete from "./dev/components/AutoComplate";
import { Banner } from "./dev/components/banner";
import Button from "./dev/components/button";
//components
// const googleMapsApiKey = "AIzaSyAnpP5K-swsJbbnmsVaqsxUudOFFdMuC-k";

const App = () => {
  return (
    <div>
      <Button />
      <Test />
      <Banner />
      {/* <AddressAutocomplete /> */}
    </div>
  );
};

export default App;
