import React from 'react';
import userEvent from '@testing-library/user-event'
import ReactDOM from 'react-dom';
import {render, screen} from '@testing-library/react'
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import App from './App';

it('rendersWithoutCrashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

test('full app rendering/navigating', () => {
  const history = createMemoryHistory()
  render(
    <Router history={history}>
      <App />
    </Router>,
  )
  expect(screen.getByText(/Stacked Over/i)).toBeInTheDocument()

  const leftClick = {button: 0}
  userEvent.click(screen.getByText(/Questions/i), leftClick)

  expect(screen.getByText(/Questions/i)).toBeInTheDocument()
});
