import NodeWrapper from "../../NodeWrapper";

function Up({ properties }) {
  const { url, name, id } = properties;
  return (
    <NodeWrapper id={id} className="up">
      <a
        href={url}
        className="font-semibold hover:text-gray-200"
        draggable={false}
      >
        {name}
      </a>{" "}
      is <span className="status-text">up</span>
    </NodeWrapper>
  );
}

export default Up;
