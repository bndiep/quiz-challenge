import React from 'react';
import '../styles.css';

const QuizScreen = ({
  handleClick,
  isCorrect,
  nextQuestion,
  quiz,
  quizData,
  hasResponded,
  selectedAnswer,
}) => {
  const { choices, correctChoice, currentQuiz, currentQuestion } = quiz;
  const quizTitle = quizData[currentQuiz].title;
  const questionArray = quizData[currentQuiz].questions[currentQuestion];

  const defineClassName = (usersChoice) => {
    // always want correctAnswer to be boxed green
    if (usersChoice === correctChoice) {
      return 'correct-answer';
    }
    // provide no styling for choices that are not selected
    if (usersChoice !== selectedAnswer) {
      return;
    } else if (selectedAnswer !== correctChoice) {
      return 'incorrect-answer';
    }
  };

  return (
    <div className="quiz" data-testid={`quiz-${currentQuiz}`}>
      <h1 className="quiz-title" data-testid={`quiz-title-${currentQuiz}`}>
        {quizTitle}
      </h1>
      <h2 className="quiz-question" data-testid={`question-${currentQuestion}`}>
        {questionArray.text}
      </h2>
      {/* forEach element capture index and assign in an alphabetical letter */}
      <div className="choicesContainer">
        <ol type="A">
          {/* onClick, user sets their final answer from choices */}
          {/* map through randomized order of choices */}
          {choices &&
            choices.map((choice, id) => {
              return (
                <li
                  data-testid={`choice-${id}`}
                  key={id}
                  value={choice}
                  className={selectedAnswer ? defineClassName(choice) : null}
                  onClick={() => handleClick(choice)}
                >
                  {choice}
                </li>
              );
            })}
        </ol>
      </div>
      {/* if the user selects a choice, display the next button */}
      {/* increment the index of the questions array */}
      {hasResponded && (
        <div>
          <p>{isCorrect ? 'Correct!' : 'Incorrect...'}</p>
          <button
            data-testid="next-button"
            title="nextButton"
            onClick={() => nextQuestion()}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizScreen;
