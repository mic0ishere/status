import React from "react";
import NodeWrapper from "../../NodeWrapper";

function Down({ properties }) {
  const { url, name, id } = properties;
  return (
    <NodeWrapper id={id}>
      <i aria-hidden className="fas fa-circle down mr-6"></i>
      <a
        href={url}
        className="font-semibold hover:text-gray-200"
        draggable={false}
      >
        {name}
      </a>{" "}
      is <span className="down font-bold">down</span>
    </NodeWrapper>
  );
}

export default Down;
