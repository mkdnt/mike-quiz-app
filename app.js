/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'How many planets are in the solar system?',
      answers: [
        '10',
        '7',
        '9',
        '8'
      ],
      correctAnswer: '8',
    },
    {
      question: 'What entity boasts a gravitational pull so powerfull even light cannot escape?',
      answers: [
        'Black Hole',
        'Sun',
        'Neutron Star',
        'Jupiter',
      ],
      correctAnswer: 'Black Hole',
    },
    {
      question: 'What is the closet star after the sun?',
      answers: [
        'Beta Centauri',
        'Milky Way',
        'Alpha Centauri A',
        'North Star',
      ],
      correctAnswer: 'Alpha Centauri A',
    },
    {
      question: 'How old is the solar system?',
      answers: [
        '800 Million Years Old',
        '11.2 Million Years Old',
        '11 Billion Years Old',
        '13.8 Billion Years Old',
      ],
      correctAnswer: '13.8 Billion Years Old',
    },
    {
      question: 'What planet does the moon Europa orbit?',
      answers: [
        'Neptune',
        'Jupiter',
        'Venus',
        'Pluto',
      ],
      correctAnswer: 'Jupiter',
    }],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};


/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

function startPage(){
  let startPage = `
  <div class="card">
  <h2>Welcome to the Space Quiz!</h2>
  <p>Test your knowledge about the deep abyss that is all around you...</p>
  <button id="start">Start Quiz</button>
</div>`
  return startPage;
}

function questionPage(){
  let question = store.questions[store.questionNumber];

  let questionPage = `
  <div class="card">
    <h2>Question ${store.questionNumber +1}</h2>
    <h3>${question.question}</h3>
    <form>
        <input type="radio" name="answer" value="${question.answers[0]}">
        <label>${question.answers[0]}</label>
        <input type="radio" name="answer" value="${question.answers[1]}">
        <label>${question.answers[1]}</label>
        <input type="radio" name="answer" value="${question.answers[2]}">
        <label>${question.answers[2]}</label>
        <input type="radio" name="answer" value="${question.answers[3]}">
        <label>${question.answers[3]}</label>
        <button type="submit">Submit your answer</button>
    </form>
  </div>`;
    return questionPage;
}

function correctResultPage(){
  const currentQuestionNumber = store.questionNumber - 1
  
  let correctResultPage = `
    <div class="card">
    <h1>Great!</h1>
    <p>You got it right - ${store.questions[currentQuestionNumber].correctAnswer} is correct!</p>
    <p>Your total score is ${store.score}.</p>
    <button id="next">Next Question</button>
    </div>`;

  let correctResultFinalPreviewPage = `
  <div class="card">
  <h1>Great!</h1>
  <p>You got it right - ${store.questions[currentQuestionNumber].correctAnswer} is correct!</p>
  <p>Go to the next page to see your final results!</p>
  <button id="final">Final Results</button>
  </div>`;

  if (store.questionNumber !== store.questions.length){
    return correctResultPage;
  }

  else if (store.questionNumber === store.questions.length){
    return correctResultFinalPreviewPage;
  }
  //maybe change in this part - if question number equals total question, go to final result page 
}

function incorrectResultPage(){
  const currentQuestionNumber = store.questionNumber - 1
  
  let incorrectResultPage = `
  <div class="card">
    <h1>Oh no!</h1>
    <p>You chose the wrong answer. The correct answer was ${store.questions[currentQuestionNumber].correctAnswer}.</p>
    <p>Your total score is ${store.score}.</p>
    <button id="next">Next Question</button>
    </div>`;


    let incorrectResultFinalPreviewPage = `
  <div class="card">
  <h1>Oh no!</h1>
  <p>You chose the wrong answer. The correct answer was ${store.questions[currentQuestionNumber].correctAnswer}.</p>
  <p>Go to the next page to see your final results!</p>
  <button id="final">Final Results</button>
  </div>`;
  
  if (store.questionNumber !== store.questions.length){
    return incorrectResultPage;
  }

  else if (store.questionNumber === store.questions.length){
    return incorrectResultFinalPreviewPage;
  }
    //maybe change in this part - if question number equals total question, go to final result page 
    //if question number is not total question, return incorrectPage; if true, finalResult
  }

  function finalResultsPage(){
    let finalResultsPage =
    ` <div class="card">
      <h1>Congrats you Finished!</h1>
      <p>Your total score is ${store.score} out of a possible ${store.questionNumber - 1}.</p>
      <button id="start">Restart Quiz</button>
      </div>`;
      return finalResultsPage
  }

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function render(){
  if(store.quizStarted === false){
    $('main').html(startPage());
  }
  else if (store.quizStarted){
    $('main').html(questionPage());
  }
}

function checkAnswer(){
  const selectedAnswer = $('input[name="answer"]:checked').val();
  if (selectedAnswer === store.questions[store.questionNumber].correctAnswer) {
    store.questionNumber++;
    store.score++;
    $('main').html(correctResultPage())
  }
  else if (selectedAnswer !== store.questions[store.questionNumber].correctAnswer) {
    store.questionNumber++;
    $('main').html(incorrectResultPage())
  }
  

  
// save for button on correctResult and incorrectResult  store.questionNumber++;
  // if right, go to correctResults
  //if wrong, incorrectResults
}
/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function handleStartQuiz(){
  $('main').on('click','#start',function(){
        store.quizStarted=true;
        render();

  })

}

function handleAnswerSubmit(){
  $('main').on('submit', 'form', function(evt){
    evt.preventDefault();
    checkAnswer();
  })
}

function handleNextQuestion(){
  $('main').on('click', '#next', function(){
    console.log("clicked Next Question")
    render();
  })
}

function finalResultsClick(){
  $('main').on('click', '#final', function(){
    console.log("clicked Final Results")
    $('main').html(finalResultsPage());
  })
}

function main(){
  render();
  handleStartQuiz();
  handleAnswerSubmit();
  handleNextQuestion();
  finalResultsClick()
}



$(main);