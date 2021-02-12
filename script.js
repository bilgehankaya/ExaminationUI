const questionChoices = {};

function addChoice(questionID) {
  if (!questionChoices.hasOwnProperty(questionID))
    questionChoices[questionID] = 0;

  if (questionChoices[questionID] < 5) {
    questionChoices[questionID] = (questionChoices[questionID] + 1);
    console.log(`Choices: ${questionChoices[questionID]}`);
    choiceID = getRandomInt(9999999);
    let choiceTags = `<div id="choice${choiceID}" class="input-group mt-2">
        <input id="input${choiceID}" isItAnswer="false" type="text" class="form-control containsString isItAnswer${questionID}">
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
}

function answerGreen(choiceID, questionID) {
  $(`.hide${questionID}`).show();
  $(`.isItAnswer${questionID}`).css('background', '#FFFFFF');
  $(`#selectChoice${choiceID}`).hide();
  $(`#input${choiceID}`).css('background', 'rgba(0, 128, 0, 0.6)')
}

function createQuestion() {
  questionID = getRandomInt(9999999);
  const questionTags = `
  <div id="question${questionID}" class="py-5">
    <div class="form-group">
      <strong>Question Content</strong>
      <input path="name" placeholder="2 + 2 = ?" class="form-control form-control-user containsString"/>
    </div>
    <div class="form-group">
      <strong>Points: </strong>
      <input path="description" class="form-control form-control-user containsString"/>
    </div>
    <div id="choices${questionID}">
    </div>
    <button id="addChoice" onclick="addChoice('${questionID}');" class="btn btn-warning btn-block text-white btn-user mt-3" type="button">Add choice</button>
    <button id="delQuestion" onclick="deleteQuestion('${questionID}')" class="btn btn-danger btn-block text-white btn-user" type="button">Delete Question</button
  </div>`

  $("#questionDiv").append(questionTags);
}

function deleteQuestion(questionID) {
  $(`#question${questionID}`).remove();
  delete questionChoices[questionID];
  console.log("Question is removed!");
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function postExam(){

}