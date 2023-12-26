import NodeWrapper from "../../NodeWrapper";

function NotChecked({ properties }) {
  const { url, name, id } = properties;
  return (
    <NodeWrapper id={id} className="paused">
      <a
        href={url}
        className="font-semibold hover:text-gray-200"
        draggable={false}
      >
        {name}
      </a>{" "}
      <span className="status-text">wasn&apos;t checked </span>yet
    </NodeWrapper>
  );
}

export default NotChecked;
