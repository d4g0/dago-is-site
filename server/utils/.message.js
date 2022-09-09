import { bot } from "./bot_api_service";

export default eventHandler( async (event) => {
  console.log("api message hit");
  const request = event.req;
  
  if(!(request.method.toUpperCase() == 'POST')){
    return {
      ok:false
    }
  }
  
  const body = await await useBody(request);
  const { message } = body;

  bot.configure();
  try {
    if (!message) {
      throw new Error("Non valid msg");
    }
    await bot.notify_business_administrators(message)
    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: error.message
    };
  }
});
