import React from 'react';
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignIn from './SignIn';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'

function renderWithRouter(
    ui,
    {
        route = '/user/dashboard',
        history = createMemoryHistory({ initialEntries: [route] }),
    } = {}
) {
    return {
        ...render(<Router history={history}>{ui}</Router>),
        history,
    }
}

it('render SignIn Component and on click withou any value to give error', async () => {
    const { getByTestId, getByText } = render(<SignIn />);
    fireEvent.click(getByTestId('signin'));
    const greetingSignInNode = await waitForElement(() =>
        getByTestId('signin-error')
    );
    expect(greetingSignInNode).toHaveTextContent('User with this email id does not exist')
});

it('render SignIn Component and on click withou any value to give error', async () => {
    const { getByTestId, getByText } = render(<SignIn />);
    fireEvent.click(getByTestId('signin'));
    const greetingSignInNode = await waitForElement(() =>
        getByTestId('signin-error')
    );
    expect(greetingSignInNode).toHaveTextContent('User with this email id does not exist')
});

it('now with react router', () => {
    const { history, getByTestId } = renderWithRouter(<SignIn />)

    fireEvent.change(getByTestId('email'), { target: { value: 'test@test.com' } });
    fireEvent.change(getByTestId('password'), { target: { value: 'test123' } });
    fireEvent.click(getByTestId('signin'));
    expect(history.location.pathname).toEqual('/user/dashboard');
})