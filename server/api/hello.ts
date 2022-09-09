import type { IncomingMessage, ServerResponse } from "http";

export default async (req: IncomingMessage, res: ServerResponse) => {
  res.statusCode = 200;
  const result = {
    data: "Hello world!",
  };
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(result));
};
