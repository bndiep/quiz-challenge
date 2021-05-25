import React from 'react';
import { getMessage } from '../data/messages';

const SummaryScreen = ({
  currentScore,
  nextQuiz,
  totalNumOfQuestions,
  quiz,
  quizData,
  resetQuiz,
}) => {
  return (
    <div className="summary">
      <h1 data-testid="summary-heading">Summary</h1>
      {/* pass in the number of correct answers from quiz */}
      {/* NOTE: total number of questions per quiz are different and need to be changed dynamically */}
      <p>
        You got <span className="score">{currentScore}</span> out of
        <span className="score">{totalNumOfQuestions}</span> correct!
      </p>
      <p>{getMessage()}</p>
      {quiz.currentQuiz === quizData.length - 1 ? (
        <button data-testid="restart-button" onClick={() => resetQuiz()}>
          Try Again!
        </button>
      ) : (
        <button data-testid="next-quiz" onClick={() => nextQuiz()}>
          Next
        </button>
      )}
    </div>
  );
};

export default SummaryScreen;
