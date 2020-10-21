/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What color is broccoli?',
      answers: [
        'red',
        'orange',
        'pink',
        'green'
      ],
      correctAnswer: 'green'
    },
    {
      question: 'What is the current year?',
      answers: [
        '1970',
        '2015',
        '2019',
        '2005'
      ],
      correctAnswer: '2019'
    }
  ],
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
  let correctResultPage = `
    <div class="card">
    <h1>Great!</h1>
    <p>You got it right - ${store.questions[store.questionNumber].correctAnswer} is correct!</p>
    <p>Your total score is ${store.score}.</p>
    <button id="next">Next Question</button>
    </div>`;
  return correctResultPage
}

function incorrectResultPage(){
  let incorrectResultPage = `
  <div class="card">
    <h1>Oh no!</h1>
    <p>You chose the wrong answer. The correct answer was ${store.questions[store.questionNumber].correctAnswer}.</p>
    <p>Your total score is ${store.score}.</p>
    <button id="next">Next Question</button>
    </div>`;

    return incorrectResultPage
  
    // then on the button click you can add to the questionNumber
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
    store.score++;
    $('main').html(correctResultPage())
  }
  else if (selectedAnswer !== store.questions[store.questionNumber].correctAnswer) {
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
    store.questionNumber++;
    render();
  })
}

function main(){
  render();
  handleStartQuiz();
  handleAnswerSubmit();
  handleNextQuestion();
}



$(main);