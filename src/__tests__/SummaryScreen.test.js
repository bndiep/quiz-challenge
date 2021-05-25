import React from 'react';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import SummaryScreen from '../components/SummaryScreen';

afterEach(cleanup);

describe('SummaryScreen component', () => {
  it.skip('should render without crashing', () => {
    expect(<SummaryScreen />);
  });
});
