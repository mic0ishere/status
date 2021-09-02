import { URLSearchParams } from "url";
let apiData = {};
let time = 0;
export default async function statusApi(req, res) {
  const timeNow = `${Date.now()}`
  const timeNowFormatted = timeNow.substr(0, timeNow.length - 3)
  const timeBefore = Number(timeNowFormatted) - 2 * 24 * 60 * 60;
  if (time < Date.now() - 10 * 1000) {
    const params = new URLSearchParams();
    params.append("response_times", 1);
    params.append("response_times_average", "60");
    params.append("response_times_start_date", timeBefore);
    params.append("response_times_end_date", timeNowFormatted);
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
    apiData = await request.json();
    time = Date.now();
  }
  if (!req.query.monitor) {
    res.status(200).json({
      time: time,
      monitors: apiData.monitors.map(
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
  } else if (apiData.monitors.some(({ id }) => id == req.query?.monitor)) {
    const {
      friendly_name,
      id,
      status,
      url,
      port,
      all_time_uptime_ratio,
      custom_uptime_ratio,
      response_times,
      logs,
    } = apiData.monitors.find(({ id }) => id == req.query?.monitor);
    const changeValues = (value) => {
      if (value > 300) value = Math.floor(value / 1.5);
      if (value > 800) value = Math.floor(value / 2.5);
      if (value > 1000) {
        return changeValues(value);
      }
      return value;
    };
    const noiceMap = response_times.map(({ value, datetime }) => ({
      value: changeValues(value),
      datetime,
    }));
    res.status(200).json({
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
      response_times: noiceMap.length >= 6 ? noiceMap.sort(function (a, b) {
        const dateA = new Date(Number(a.datetime)),
          dateB = new Date(Number(b.datetime));
        return dateA - dateB;
      }) : null,
      events: logs,
    });
  } else {
    res.status(200).json({
      message: "No monitors found",
    });
  }
}
