const clova = require("@line/clova-cek-sdk-nodejs");
const line = require('@line/bot-sdk');

// handler
var LaunchRequestHandler = require("./handlers/LaunchRequestHandler").LaunchRequestHandler;
var SampleIntentHandler = require("./handlers/SampleIntentHandler").SampleIntentHandler;

const clovaSkillHandler = clova.Client
  .configureSkill() 
  .onLaunchRequest(async responseHelper => {

    // sessionAttributesを明示的にクリア
    responseHelper.setSessionAttributes({})

    responseHelper = await LaunchRequestHandler(clova, responseHelper);
  })
  .onIntentRequest(async responseHelper => {
    const intent = responseHelper.getIntentName();
    const sessionId = responseHelper.getSessionId();

    switch (intent) {
      case "SampleIntent":
        responseHelper.setSimpleSpeech(
          clova.SpeechBuilder.createSpeechText(`Clovaが喋る内容`)
        );
        break;
      case "Clova.GuideIntent":
        break;
      case "Clova.YesIntent":
        break;
      case "Clova.NoIntent":
        break;
    }
  })
  .onSessionEndedRequest(responseHelper => {
    responseHelper.endSession();

  })

exports.handler = async (event, content) => {
  console.log("event: " + JSON.stringify(event));

  var ctx = new clova.Context(event);
  const requestType = ctx.requestObject.request.type;
  const requestHandler = clovaSkillHandler.config.requestHandlers[requestType];

  if (requestHandler) {
    await requestHandler.call(ctx, ctx);
  }

  return ctx.responseObject;
};
