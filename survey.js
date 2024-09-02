function getScript() {
  return `
Qualtrics.SurveyEngine.addOnReady(function() {
    function removeAbc(text) {
        return text.replace(/abc/g, '');
    }

    function processQuestion(questionId) {
        var question = document.getElementById(questionId);
        if (!question) return;

        var questionText = question.querySelector('.QuestionText');
        if (questionText) {
            questionText.innerHTML = removeAbc(questionText.innerHTML);
        }

        var choices = question.querySelectorAll('label');
        choices.forEach(function(choice) {
            choice.innerHTML = removeAbc(choice.innerHTML);
        });

        var otherElements = question.querySelectorAll('.ChoiceStructure, .LabelWrapper');
        otherElements.forEach(function(element) {
            element.innerHTML = removeAbc(element.innerHTML);
        });
    }

    function processSurvey() {
        var questions = document.querySelectorAll('[id^="QID"]');
        questions.forEach(function(question) {
            processQuestion(question.id);
        });
    }

    processSurvey();

    document.addEventListener('QuestionUpdated', function(event) {
        if (event.detail && event.detail.questionId) {
            processQuestion(event.detail.questionId);
        }
    });
});
  `;
}
