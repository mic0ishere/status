function Circle({ animate, ...props }) {
  return (
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`mr-8 w-full h-[1em] status-circle ${
          animate ? "animate" : ""
        }`}
        {...props}
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
    </span>
  );
}

export default Circle;
