function Container({ children }) {
  return (
    <div className="flex flex-col items-center w-full min-h-screen text-white body">
      {children}
    </div>
  );
}

export default Container;
