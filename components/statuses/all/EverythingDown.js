import React from "react";
import AllWrapper from "../../AllWrapper";

function EverythingDown() {
  return (
    <AllWrapper>
      <i aria-hidden className="fas fa-circle down mr-6"></i>All systems are{" "}
      <span className="down font-bold">down</span>
    </AllWrapper>
  );
}

export default EverythingDown;
