const questionChoices = {}; // number of choices are stored for question
const questionAnswers = {}; // answer of question are stored
const examInfo = { // object variable to post
  title: "TITLE",
  startDate: "2021-02-04 11:00",
  finishDate: "2021-02-04 13:00",
  questions: []
};

function addChoice(questionID) {
  if (!questionChoices.hasOwnProperty(questionID))
    questionChoices[questionID] = 0;

  if (questionChoices[questionID] < 5) {
    questionChoices[questionID] = (questionChoices[questionID] + 1);
    console.log(`Choices: ${questionChoices[questionID]}`);
    choiceID = getRandomInt(9999999);
    let choiceTags = `<div id="choice${choiceID}" class="input-group mt-2">
        <input id="input${choiceID}" isItAnswer="false" type="text" class="form-control choiceOf${questionID} isItAnswer${questionID}">
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
}

function createQuestion() {
  questionID = getRandomInt(9999999);
  const questionTags = `
  <div id="question${questionID}" class="py-5">
    <div class="form-group">
      <strong>Question Content</strong>
      <input id="content${questionID}" path="name" placeholder="2 + 2 = ?" class="form-control form-control-user containsString"/>
    </div>
    <div class="form-group">
      <strong>Points: </strong>
      <input id="point${questionID}" path="description" class="form-control form-control-user containsString"/>
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

function getChoices(questionID) {
  const choicesOfQuestion = $(`.choiceOf${questionID}`).map(
    (i, e) => e.value).get();
  const choices = [];

  choicesOfQuestion.forEach((element, index) => {
    choices.push({
      number: index + 1,
      content: element
    })
  })

  console.log(choices);
  return choices;
}

function getAnswerIndex(questionID, choiceID) {
  const choicesOfQuestion = $(`.choiceOf${questionID}`).map(
    (i, e) => e.id).get();

  for (let i = 0; i < choicesOfQuestion.length; i++) {
    if (choicesOfQuestion[i] === `input${choiceID}`) {
      return i + 1;
    }
  }

}

function getQuestionProps(index, questionID) {
  return {
    number: index + 1,
    point: $(`#point${questionID}`).val(),
    content: $(`#content${questionID}`).val(),
    correctChoice: getAnswerIndex(questionID, questionAnswers[questionID]),
    choices: getChoices(questionID)
  };
}

function postExam() {
  (Object.entries(questionAnswers)).forEach((element, index) => {
    console.log(index);
    console.log(element[0]);
    examInfo['questions'].push(getQuestionProps(index, element[0]))
  });

  console.log(examInfo);

  const url = "http://www.bilgehankaya.me:3000/restapi/api/exams";
  const key =
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJiaWxnZSIsImlhdCI6MTYxMzQyMTIwOSwiZXhwIjoxNjEzNzgxMjA5fQ.gRjaq6h63kE5FfFrzCiNsHHL9UPXtP2RSGMHwa1tnV_xgebHBGUCAgNVdgwk7JLAuaD7d6NAZHsDxl6glWmi9g";

  fetch(url, {
      method: 'POST',
      body: JSON.stringify(examInfo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": key
      }
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));

}