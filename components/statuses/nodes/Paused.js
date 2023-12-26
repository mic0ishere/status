import NodeWrapper from "../../NodeWrapper";

function Paused({ properties }) {
  const { url, name, id } = properties;
  return (
    <NodeWrapper id={id} className="paused">
      <a
        href={url}
        className="font-semibold hover:text-gray-200"
        draggable={false}
      >
        {name}
      </a>
      &apos;s monitoring is <span className="status-text">paused</span>
    </NodeWrapper>
  );
}

export default Paused;
