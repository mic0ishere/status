import React from "react";
import Card from "./Card";

function AllWrapper({ children }) {
  return (
    <Card className="py-10 px-7 sm:py-14 md:py-20 md:px-10 mt-12 mb-20">
      <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-semibold">
        {children}
      </h1>
      <span className="font-normal text-base md:text-lg absolute bottom-2 right-4 text-gray-400">
        Next update in: <span id="timer">60</span> sec.
      </span>
    </Card>
  );
}

export default AllWrapper;
