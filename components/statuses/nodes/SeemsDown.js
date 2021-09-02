import React from "react";
import NodeWrapper from "../../NodeWrapper";

function SeemsDown({ properties }) {
  const { url, name, id } = properties;
  return (
    <NodeWrapper id={id}>
      <i aria-hidden className="fas fa-circle seems-down mr-6"></i>
      <a
        href={url}
        className="font-semibold hover:text-gray-200"
        draggable={false}
      >
        {name}
      </a>{" "}
      <span className="seems-down font-bold">seems down</span>
    </NodeWrapper>
  );
}

export default SeemsDown;
