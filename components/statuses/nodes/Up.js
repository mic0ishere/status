import React from "react";
import NodeWrapper from "../../NodeWrapper";

function Up({ properties }) {
  const { url, name, id } = properties;
  return (
    <NodeWrapper id={id}>
      <i aria-hidden className="fas fa-circle up mr-6"></i>
      <a
        href={url}
        className="font-semibold hover:text-gray-200"
        draggable={false}
      >
        {name}
      </a>{" "}
      is <span className="up font-bold">up</span>
    </NodeWrapper>
  );
}

export default Up;
