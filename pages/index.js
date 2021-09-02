import * as Statuses from "../components/statuses";
import React, { useEffect } from "react";
import Container from "../components/Container";
import useSWR from "swr";

function doCountdown() {
  const timer = document.querySelector("span#timer");
  for (let index = 60; index > 0; index--) {
    setTimeout(() => {
      if (timer) timer.textContent = index;
    }, (60 - index) * 1000);
  }
}
const fetcher = (url) => fetch(url).then((r) => r.json());
function Home() {
  const { data, isValidating } = useSWR(
    `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/status`,
    fetcher,
    { refreshInterval: 60000, revalidateOnFocus: false }
  );
  const filteredStatuses = data?.monitors.filter(
    (monitor) => ![0, 1].includes(monitor.status)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      doCountdown();
    }, 60 * 1000);
    doCountdown();
    return () => clearInterval(interval);
  }, []);
  return (
    <Container>
      {filteredStatuses?.every((monitor) => monitor.status === 2) ||
      isValidating ? (
        <Statuses.EverythingUp />
      ) : filteredStatuses?.every(
          (monitor) => monitor.status === 8 || monitor.status === 9
        ) ? (
        <Statuses.EverythingDown />
      ) : (
        <Statuses.SomeDown />
      )}
      {data?.monitors.length > 0 &&
        data?.monitors.map((monitor, i) => {
          const { status } = monitor;
          if (status === 0)
            return <Statuses.Paused key={i} properties={monitor} />;
          if (status === 1)
            return <Statuses.NotChecked key={i} properties={monitor} />;
          if (status === 2) return <Statuses.Up key={i} properties={monitor} />;
          if (status === 8)
            return <Statuses.SeemsDown key={i} properties={monitor} />;
          if (status === 9)
            return <Statuses.Down key={i} properties={monitor} />;
        })}
    </Container>
  );
}

export default Home;
