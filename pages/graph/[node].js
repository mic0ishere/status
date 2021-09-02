import React from "react";
import { Line } from "react-chartjs-2";

function Graph({ monitor }) {
  const { response_times } = monitor;
  const savedData = { ...monitor };
  savedData.events[0].duration = "";
  const data = {
    labels: response_times.map((x) => {
      const date = new Date(Number(`${x.datetime}000`));
      return date.toLocaleString("en", {
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }),
    datasets: [
      {
        label: "Response time",
        data: response_times.map((x) => x.value),
        // borderColor: "#e6b96c",
        borderColor: "#6ce686",
        fill: true,
        backgroundColor: "rgba(93, 199, 116, 0.2)",
        // cubicInterpolationMode: 'monotone',
        tension: 0.3,
      },
    ],
  };
  const options = {
    responsive: true,
    pointStyle: "round",
    pointRadius: "0",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "Response time";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += `${context.parsed.y} ms`;
            }
            return label;
          },
        },
      },
      custom_canvas_background_color: {
        beforeDraw: (chart) => {
          const ctx = chart.canvas.getContext("2d");
          ctx.save();
          ctx.globalCompositeOperation = "destination-over";
          ctx.fillStyle = "lightGreen";
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        },
      },
    },
    scales: {
      y: {
        grid: {
          color: "#4B5563",
          borderColor: "transparent",
          tickColor: "transparent",
        },
        ticks: {
          color: "#9CA3AF",
          callback: function (value, index, values) {
            return index % 2 === 0 ? `${value} ms` : "";
          },
        },
      },
      x: { display: false },
    },
  };
  return <Line data={data} className="card-color-body" options={options} />;
}
export async function getServerSideProps(context) {
  const statusNode = context.params.node;
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/status?monitor=${statusNode}`
  );
  const json = await req.json();
  return {
    props: {
      monitor: json,
    },
    notFound: !json.status,
  };
}
export default Graph;
