import React from "react";
import AllWrapper from "../../AllWrapper";

function SomeDown() {
  return (
    <AllWrapper>
      <i aria-hidden className="fas fa-circle seems-down mr-6"></i>Some systems
      are <span className="seems-down font-bold">down</span>
    </AllWrapper>
  );
}

export default SomeDown;
