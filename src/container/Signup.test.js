import React from 'react';
import { render, cleanup, fireEvent, waitForElement, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUp from './SignUp';


// two test case on registers with unique email we generate using random

const d = Math.round(100000 * Math.random());
it('renders signup component, with inputs and upon clicking sign is unique mail id user is created', async () => {
    const { getByTestId } = render(<SignUp />)
    fireEvent.change(getByTestId('email'), { target: { value: `test@${d}.com` } });
    fireEvent.change(getByTestId('name'), { target: { value: `test@${d}-name` } });
    fireEvent.change(getByTestId('password'), { target: { value: 'test123' } });

    fireEvent.click(getByTestId('register'));
    const greetingSignUpNode = await waitForElement(() =>
        getByTestId('signup-success')
    );
    expect(greetingSignUpNode).toHaveTextContent('User Successfully created');
});

it('if repeated mail id then Error msg', async () => {
    const { getByTestId } = render(<SignUp />)
    fireEvent.change(getByTestId('email'), { target: { value: `test@test.com` } });
    fireEvent.change(getByTestId('name'), { target: { value: `test@${d}-name` } });
    fireEvent.change(getByTestId('password'), { target: { value: 'test123' } });

    fireEvent.click(getByTestId('register'));
    const greetingSignUpNode = await waitForElement(() =>
        getByTestId('signup-error')
    );
    expect(greetingSignUpNode).toHaveTextContent('11000 duplicate key error collection: ecommerce.users index: email already exists');
})

