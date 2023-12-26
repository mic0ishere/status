import { Area, AreaChart, Tooltip, ResponsiveContainer, YAxis } from "recharts";

function Chart({ responseTimes }) {
  const sortedResponseTimes = responseTimes
    .sort((a, b) => {
      const dateA = new Date(Number(a.datetime)),
        dateB = new Date(Number(b.datetime));
      return dateA - dateB;
    })
    .map((x) => ({
      date: new Date(x.datetime * 1000),
      response: x.value,
    }));

  const minScaleValue =
    Math.min(...sortedResponseTimes.map((x) => x.response)) - 50;
  const maxScaleValue =
    Math.max(...sortedResponseTimes.map((x) => x.response)) + 50;

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={sortedResponseTimes}>
        <defs>
          <linearGradient id="colorResponse" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <YAxis domain={[minScaleValue, maxScaleValue]} allowDataOverflow hide />
        <Tooltip cursor={false} content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="response"
          stroke="#82ca9d"
          fillOpacity={1}
          activeDot={
            <circle className="outline-none" r={5} fill="#82ca9d" strokeWidth={0} />
          }
          fill="url(#colorResponse)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const value = payload[0].payload;
    return (
      <div className="bg-secondary rounded-lg shadow-lg p-3">
        <p className="text-gray-400">
          {value.date.toLocaleString("en", {
            timeStyle: "short",
            dateStyle: "medium",
            year: undefined,
          })}
        </p>
        <p className="text-white font-semibold">{`${value.response} ms`}</p>
      </div>
    );
  }

  return null;
};

export default Chart;
