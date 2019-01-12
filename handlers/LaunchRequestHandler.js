var { defaultSessionAttributes } = require("./../sessionAttributes");

exports.LaunchRequestHandler = async (clova, responseHelper) => {

  // sessionAttributesを明示的にクリアし、defaultsessionattributesに
  responseHelper.setSessionAttributes(defaultSessionAttributes)

  var msg = "";

  responseHelper.setSimpleSpeech(
    clova.SpeechBuilder.createSpeechText(msg)
  );

  return responseHelper;

}

