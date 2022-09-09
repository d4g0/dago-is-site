import type { IncomingMessage, ServerResponse } from "http";
import { bot } from "../utils/bot_api_service";

export default async (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader("Content-Type", "application/json");
  if (!(req.method.toLowerCase() == "post")) {
    res.statusCode = 403;
    return res.end(JSON.stringify({ error: "Bad Method" }));
  }

  const data: Message = await parseReqBody(req);
  //   console.log({ data });
  const { message } = data;
  bot.configure();

  try {
    if (!message) {
      throw new Error("Non valid msg");
    }
    await bot.notify_business_administrators(message);
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        ok: true,
      })
    );
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        ok: false,
        error: error.message,
      })
    );
  }
};

async function parseReqBody(req: IncomingMessage) {
  let buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  const data = JSON.parse(Buffer.concat(buffers).toString());

  return data;
}

interface Message {
  message: string;
}
