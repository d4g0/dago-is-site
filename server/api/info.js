export default eventHandler((event) => {
  const cityHeader = event.req.headers["x-vercel-ip-city"];
  const city = cityHeader ? decodeURIComponent(cityHeader) : "-";
  const ipHeader = event.req.headers["x-forwarded-for"];
  const ip = ipHeader ? ipHeader.split(",")[0] : "-";

  return {
    city,
    ip,
  };
});


