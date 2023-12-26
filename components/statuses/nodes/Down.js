import NodeWrapper from "../../NodeWrapper";

function Down({ properties }) {
  const { url, name, id } = properties;
  return (
    <NodeWrapper id={id} className="down">
      <a
        href={url}
        className="font-semibold hover:text-gray-200"
        draggable={false}
      >
        {name}
      </a>{" "}
      is <span className="status-text">down</span>
    </NodeWrapper>
  );
}

export default Down;
