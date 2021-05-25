import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

/*NOTE: decided to write e2e tests for parent component because most of the
  complex logic sits in App while the child components simply display text*/

// TEST: <App />=== === === === === === === === === ===
describe('App', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    expect(<App />);
  });
});

// TEST: <QuizScreen /> === === === === === === === === === ===
describe('QuizScreen component within App', () => {
  it('should render', () => {
    render(<App />);
    const quizDisplay = screen.getByTestId('quiz-0');
    expect(quizDisplay).toBeInTheDocument();
  });

  it('should have a title', () => {
    render(<App />);
    const title = screen.getByTestId('quiz-title-0');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Basics of HTML');
  });

  it('should have quiz choices', () => {
    render(<App />);
    const question = screen.getByTestId('question-0');
    expect(question).toBeInTheDocument();
    expect(question).toHaveTextContent(
      'Which element is used for a top-level heading?',
    );
  });

  describe('with correct answer selected', () => {
    it('should return correct answer class upon click', () => {
      render(<App />);
      let rightChoice = screen.getByText('h1');
      fireEvent.click(rightChoice);
      expect(rightChoice).toHaveClass('correct-answer');
    });

    it('should return correct-answer styling', () => {
      render(<App />);
      let rightChoice = screen.getByText('h1');
      fireEvent.click(rightChoice);
      expect(rightChoice).toHaveStyle({ border: '1px solid green' });
    });
  });

  describe('with incorrect answer selected', () => {
    it('should return incorrect-answer class upon click', () => {
      render(<App />);
      let wrongChoice = screen.getByText('h0');
      fireEvent.click(wrongChoice);
      expect(wrongChoice).toHaveClass('incorrect-answer');
    });

    it('should return incorrect-answer styling', () => {
      render(<App />);
      let wrongChoice = screen.getByText('h0');
      fireEvent.click(wrongChoice);
      expect(wrongChoice).toHaveStyle({
        border: '1px solid red',
        textDecoration: 'line-through',
      });
    });
  });

  describe('when the user selects an answer', () => {
    it("should render 'Next' button", () => {
      render(<App />);
      let userChoice = screen.getByTestId('choice-0');
      fireEvent.click(userChoice);
      let button = screen.getByText('Next');
      expect(button).toBeInTheDocument();
    });

    it("should display 'Correct!' when correct answer selected", () => {
      render(<App />);
      let rightChoice = screen.getByText('h1');
      fireEvent.click(rightChoice);
      let correctTextDisplay = screen.getByText('Correct!');
      expect(correctTextDisplay).toBeInTheDocument();
    });

    it("should display 'Incorrect...' when correct answer selected", () => {
      render(<App />);
      let wrongChoice = screen.getByText('h0');
      fireEvent.click(wrongChoice);
      let incorrectTextDisplay = screen.getByText('Incorrect...');
      expect(incorrectTextDisplay).toBeInTheDocument();
    });
  });

  describe("when the user clicks 'Next'", () => {
    it('should show the next question', async () => {
      render(<App />);
      let userChoice = screen.getByTestId('choice-1');
      fireEvent.click(userChoice);
      let button = await screen.getByTestId('next-button');
      fireEvent.click(button);
      let nextQuestion = screen.getByTestId('question-1');
      expect(nextQuestion).toHaveTextContent(
        'Which element is used for a page break?',
      );
    });
  });
});

// TEST: <SummaryScreen /> === === === === === === === === === ===
describe('SummaryScreen component within App', () => {
  it('should not render on initial mount', async () => {
    const summaryHeading = await screen.queryByText('Summary');
    expect(summaryHeading).toBeNull();
  });

  it('should render after user clicks next on last question of current quiz', async () => {
    render(<App />);
    let userChoice = screen.getByTestId('choice-1');
    for (let i = 0; i < 4; i++) {
      fireEvent.click(userChoice);
      fireEvent.click(await screen.getByTestId('next-button'));
    }
    const summaryHeading = screen.getByTestId('summary-heading');
    expect(summaryHeading).toBeInTheDocument();
  });

  it("should render the 'Try Again' button on last quiz summary", async () => {
    render(<App />);
    // go through the first quiz of 4 questions
    let userChoiceQuiz1 = screen.getByTestId('choice-1');
    for (let i = 0; i < 4; i++) {
      fireEvent.click(userChoiceQuiz1);
      fireEvent.click(await screen.getByTestId('next-button'));
    }
    // click summary screen 'next' button to take user to next quiz
    const nextQuizButton = screen.getByTestId('next-quiz');
    fireEvent.click(nextQuizButton);
    // go through the second quiz of 3 questions
    let userChoiceQuiz2 = screen.getByTestId('choice-0');
    for (let i = 0; i < 3; i++) {
      fireEvent.click(userChoiceQuiz2);
      fireEvent.click(await screen.getByTestId('next-button'));
    }
    let restartButton = screen.getByTestId('restart-button');
    expect(nextQuizButton).not.toBeInTheDocument();
    expect(restartButton).toHaveTextContent('Try Again!');
  });

  describe("on click of 'Try Again!' button", () => {
    it('should take user to first quiz', async () => {
      render(<App />);
      let userChoiceQuiz1 = screen.getByTestId('choice-1');
      for (let i = 0; i < 4; i++) {
        fireEvent.click(userChoiceQuiz1);
        fireEvent.click(await screen.getByTestId('next-button'));
      }
      const nextQuizButton = screen.getByTestId('next-quiz');
      fireEvent.click(nextQuizButton);
      let userChoiceQuiz2 = screen.getByTestId('choice-0');
      for (let i = 0; i < 3; i++) {
        fireEvent.click(userChoiceQuiz2);
        fireEvent.click(await screen.getByTestId('next-button'));
      }
      let restartButton = screen.getByTestId('restart-button');
      fireEvent.click(restartButton);
      const title = screen.getByTestId('quiz-title-0');
      expect(title).toHaveTextContent('Basics of HTML');
    });
  });
});
