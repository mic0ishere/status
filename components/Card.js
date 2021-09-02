import React from "react";

function Card({ children, className }) {
  return (
    <div className={`w-11/12 sm:w-4/5 card-color rounded-xl shadow-lg relative ${className}`}>
      {children}
    </div>
  );
}

export default Card;
