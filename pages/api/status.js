import { URLSearchParams } from "url";

let cachedMonitors = [];
let timeUpdated = 0;

export default async function statusApi(req, res) {
  if (timeUpdated < Date.now() - 10 * 1000) {
    const params = new URLSearchParams();
    params.append("response_times", 1);
    params.append("response_times_average", "60");
    params.append(
      "response_times_start_date",
      Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60
    );
    params.append("response_times_end_date", Math.floor(Date.now() / 1000));
    params.append("logs", 1);
    params.append("all_time_uptime_ratio", 1);
    params.append("custom_uptime_ratios", "1-7-30");

    const request = await fetch(
      `https://api.uptimerobot.com/v2/getMonitors?api_key=${process.env.UPTIMEROBOT_KEY}`,
      {
        method: "POST",
        headers: {
          "cache-control": "no-cache",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      }
    );

    const json = await request.json();

    if (json.monitors) {
      cachedMonitors = json.monitors.filter(
        ({ id }) => !process.env.IGNORED_MONITORS.includes(id)
      );
      timeUpdated = Date.now();
    }
  }

  res.setHeader("Cache-Control", "s-maxage=600");

  if (!req.query.monitor) {
    return res.status(200).json({
      time: timeUpdated,
      monitors: cachedMonitors.map(
        ({
          friendly_name,
          id,
          status,
          url,
          port,
          all_time_uptime_ratio,
          custom_uptime_ratio,
        }) => ({
          id,
          status,
          name: friendly_name,
          url: `${url.startsWith("http") ? "" : "http://"}${url}${
            port && ":"
          }${port}`,
          uptime_ratio: {
            "24H": Number(custom_uptime_ratio.split("-")[0]).toFixed(2),
            "7D": Number(custom_uptime_ratio.split("-")[1]).toFixed(2),
            "30D": Number(custom_uptime_ratio.split("-")[2]).toFixed(2),
            all: Number(all_time_uptime_ratio).toFixed(2),
          },
        })
      ),
    });
  }

  const foundMonitor = cachedMonitors.find(
    ({ id }) => id == req.query?.monitor
  );
  if (!foundMonitor)
    return res.status(200).json({
      message: "No monitors found",
    });

  res.status(200).json({
    id: foundMonitor.id,
    status: foundMonitor.status,
    name: foundMonitor.friendly_name,
    url: `${foundMonitor.url.startsWith("http") ? "" : "https://"}${
      foundMonitor.url
    }${foundMonitor.port && ":"}${foundMonitor.port}`,
    uptime_ratio: {
      "24H": Number(foundMonitor.custom_uptime_ratio.split("-")[0]).toFixed(2),
      "7D": Number(foundMonitor.custom_uptime_ratio.split("-")[1]).toFixed(2),
      "30D": Number(foundMonitor.custom_uptime_ratio.split("-")[2]).toFixed(2),
      all: Number(foundMonitor.all_time_uptime_ratio).toFixed(2),
    },
    response_times:
      foundMonitor.response_times.length >= 6
        ? foundMonitor.response_times.sort(function (a, b) {
            const dateA = new Date(Number(a.datetime)),
              dateB = new Date(Number(b.datetime));
            return dateA - dateB;
          })
        : null,
    events: foundMonitor.logs,
  });
}
