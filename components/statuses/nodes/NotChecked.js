import React from "react";
import NodeWrapper from "../../NodeWrapper";

function NotChecked({ properties }) {
  const { url, name, id } = properties;
  return (
    <NodeWrapper id={id}>
      <i aria-hidden className="fas fa-circle paused mr-6"></i>
      <a
        href={url}
        className="font-semibold hover:text-gray-200"
        draggable={false}
      >
        {name}
      </a>{" "}
      <span className="paused font-bold">wasn&apos;t checked </span>yet
    </NodeWrapper>
  );
}

export default NotChecked;
