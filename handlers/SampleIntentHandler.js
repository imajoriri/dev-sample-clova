exports.AccountingIntentHandler = async (clova, responseHelper) => {
  var msg = "";

  // sessionAttributesオブジェクト自体を取得
  var sessionAttributes = responseHelper.getSessionAttributes();

  // Clovaが発話する内容
  responseHelper.setSimpleSpeech(
    clova.SpeechBuilder.createSpeechText(msg)
  );

  return responseHelper;

}
