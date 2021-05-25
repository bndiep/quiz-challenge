import React, { useEffect, useState } from 'react';
import SummaryScreen from './components/SummaryScreen';
import QuizScreen from './components/QuizScreen';
import { quizzes } from './data/quizzes';
import { createChoices } from './helperfunctions';
import './styles.css';

const App = () => {
  // set the current quiz
  const [quiz, setQuiz] = useState({
    currentQuiz: 0,
    currentQuestion: 0,
    choices: [],
    correctChoice: '',
  });

  // the text of the answer the user selected
  const [selectedAnswer, setSelectedAnswer] = useState('');
  // whether the user's answer was correct or not
  const [isCorrect, setIsCorrect] = useState(false);
  // a response that has been made to the current question
  const [hasResponded, setHasResponded] = useState(false);
  // user's current score
  const [currentScore, setCurrentScore] = useState(0);
  // if the quiz has not been finished, set to false
  const [completeQuiz, setCompleteQuiz] = useState(false);

  const { correctChoice, currentQuiz, currentQuestion } = quiz;
  const totalNumOfQuestions = quizzes[currentQuiz].questions.length;

  // want to run useEffect everytime the question index updates or current quiz updates
  useEffect(() => {
    const { incorrectAnswers, correctAnswer } = quizzes[currentQuiz].questions[
      currentQuestion
    ];
    const quizChoices = incorrectAnswers.concat(correctAnswer);
    const randomizedChoices = createChoices(quizChoices);

    setQuiz({
      ...quiz,
      choices: randomizedChoices,
      correctChoice: correctAnswer,
    });
  }, [currentQuestion]);

  // reset the quiz if the user completes the last quiz
  const resetQuiz = () => {
    setCompleteQuiz(false);
    setQuiz({
      currentQuiz: 0,
      currentQuestion: 0,
      choices: [],
      correctChoice: '',
    });
    setCurrentScore(0);
  };

  // create a function to move onto the next quiz
  const nextQuiz = () => {
    setCompleteQuiz(false);
    setQuiz({ ...quiz, currentQuestion: 0, currentQuiz: currentQuiz + 1 });
    setCurrentScore(0);
  };

  // create a function that takes user to the next question
  const nextQuestion = () => {
    // reset states before moving onto the next question
    setSelectedAnswer('');
    setHasResponded(false);
    setIsCorrect(false);
    // evaluate whether the current index is equal to total number of questions - 1
    // before allowing the user to move onto the next quiz
    if (currentQuestion === totalNumOfQuestions - 1) {
      setCompleteQuiz(true);
    } else if (currentQuestion < totalNumOfQuestions) {
      setQuiz({ ...quiz, currentQuestion: currentQuestion + 1 });
    }
  };

  // update the score when the answer is correct
  useEffect(() => {
    if (selectedAnswer === correctChoice && selectedAnswer !== '') {
      setIsCorrect(true);
      setCurrentScore(currentScore + 1);
    }
  }, [selectedAnswer]);

  // create a function to handle a user's answer selection
  const handleUserSelect = (choice) => {
    // prevent the user from pressing another choice after answer reveal
    if (selectedAnswer !== '') return;
    setSelectedAnswer(choice);
    setHasResponded(true);
  };

  return (
    <div className="app">
      {completeQuiz ? (
        <SummaryScreen
          currentScore={currentScore}
          nextQuiz={nextQuiz}
          resetQuiz={resetQuiz}
          totalNumOfQuestions={totalNumOfQuestions}
          quiz={quiz}
          quizData={quizzes}
        />
      ) : (
        <QuizScreen
          quiz={quiz}
          handleClick={handleUserSelect}
          hasResponded={hasResponded}
          isCorrect={isCorrect}
          nextQuestion={nextQuestion}
          quizData={quizzes}
          selectedAnswer={selectedAnswer}
        />
      )}
    </div>
  );
};

export default App;
