import React from 'react';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import QuizScreen from '../components/QuizScreen';

afterEach(cleanup);

describe('QuizScreen component', () => {
  it.skip('should render without crashing', () => {
    expect(<QuizScreen />);
  });
});
