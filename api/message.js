import { bot } from "~/server_src/bot_api_service";

export default function handler(request, response) {
  bot.configure();
  const { body } = request;
  const { message } = body;
  try {
    if (!message) {
      throw new Error("Non valid msg");
    }
    response.status(200).json({
      body: request.body,
      query: request.query,
      cookies: request.cookies,
    });
  } catch (error) {
    response.status(200).json({
        body: request.body,
        query: request.query,
        cookies: request.cookies,
        error
      });
  }
}
