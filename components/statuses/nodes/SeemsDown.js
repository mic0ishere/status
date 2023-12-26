import NodeWrapper from "../../NodeWrapper";

function SeemsDown({ properties }) {
  const { url, name, id } = properties;
  return (
    <NodeWrapper id={id} className="seems-down">
      <a
        href={url}
        className="font-semibold hover:text-gray-200"
        draggable={false}
      >
        {name}
      </a>{" "}
      <span className="status-text">seems down</span>
    </NodeWrapper>
  );
}

export default SeemsDown;
