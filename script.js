const questionChoices = {}; // number of choices are stored for question
const questionAnswers = {}; // answer of question are stored

function addChoice(questionID) {

  if (questionChoices[questionID] < 5) {
    questionChoices[questionID] = (questionChoices[questionID] + 1);
    console.log(`Choices: ${questionChoices[questionID]}`);
    choiceID = getRandomInt(9999999);
    let choiceTags = `<div id="choice${choiceID}" class="input-group mt-2">
        <form:input id="input${choiceID}" path="" isItAnswer="false" type="text" class="form-control choiceOf${questionID} isItAnswer${questionID}" />
        <div class="btn-group form-group w-13 pl-2">
          <button id="delChoice${choiceID}" onclick="removeChoice('${choiceID}', '${questionID}');" class="btn-danger btn-lg fa fa-times">
          <button id="selectChoice${choiceID}" onclick="answerGreen('${choiceID}','${questionID}');" class="btn-success btn-lg fa fa-check ml-2 hide${questionID}">
        </div> 
      </div>`

    $(`#choices${questionID}`).append(choiceTags);
  } else {
    alert("You can add maximum 5 choices to the question!");
  }
}

function removeChoice(choiceID, questionID) {
  $(`#choice${choiceID}`).remove();
  console.log("Choice is removed!");
  questionChoices[questionID] = (questionChoices[questionID] - 1);
  if (questionAnswers[questionID] === choiceID) {
    questionAnswers[questionID] = null;
  }
}

function answerGreen(choiceID, questionID) {
  $(`.hide${questionID}`).show();
  $(`.isItAnswer${questionID}`).css('background', '#FFFFFF');
  $(`#selectChoice${choiceID}`).hide();
  $(`#input${choiceID}`).css('background', 'rgba(0, 128, 0, 0.6)');
  questionAnswers[questionID] = choiceID;
  $(`.isItAnswer${questionID}`).attr("isItAnswer", "false");
  $(`#input${choiceID}`).attr("isItAnswer", "true");
  
}

function createQuestion() {
  questionID = getRandomInt(9999999);
  const questionTags = `
  <div id="question${questionID}" class="py-5">
    <div class="form-group">
      <strong>Question Content</strong>
      <form:input id="content${questionID}" path="" value="2 + 2 = ?" class="form-control form-control-user containsString"/>
    </div>
    <div class="form-group">
      <strong>Points: </strong>
      <form:input id="point${questionID}" path="" value="10" class="form-control form-control-user containsString"/>
    </div>
    <div class="form-group">
      <form:input type="hidden" id="correct${questionID}" path="" value="" class="form-control form-control-user containsString"/>
    </div>
    <div id="choices${questionID}">
    </div>
    <button id="addChoice" onclick="addChoice('${questionID}');" class="btn btn-warning btn-block text-white btn-user mt-3" type="button">Add choice</button>
    <button id="delQuestion" onclick="deleteQuestion('${questionID}')" class="btn btn-danger btn-block text-white btn-user" type="button">Delete Question</button
  </div>`

  $("#questionDiv").append(questionTags);

  if (!questionChoices.hasOwnProperty(questionID))
    questionChoices[questionID] = 0;
}

function deleteQuestion(questionID) {
  $(`#question${questionID}`).remove();
  delete questionChoices[questionID];
  console.log("Question is removed!");
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getChoices(questionID, questionNumber) {
  $(`.choiceOf${questionID}`).each((index, item) => {
    $(item).attr('path', `exam.questions[${questionNumber}].choices[${index}].content`);
    console.log($(item).attr("isItAnswer"))

    if( $(item).attr("isItAnswer") === "true")
      $(`#correct${questionID}`).attr("value", index+1);
  })
}

function getQuestionProps(index, questionID) {
  $(`#content${questionID}`).attr('path', `exam.questions[${index}].content`);
  $(`#point${questionID}`).attr('path', `exam.questions[${index}].point`);
  $(`#correct${questionID}`).attr('path', `exam.questions[${index}].correctChoice`);
  getChoices(questionID, index);
}

function setAttr() {
  (Object.entries(questionChoices)).forEach((element, index) => {
    getQuestionProps(index, element[0]);
  });
}