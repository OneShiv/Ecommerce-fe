import React from 'react';
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignIn from './SignIn';

it('render SignIn Component', async () => {
    const { getByTestId, getByText } = render(<SignIn />);
    fireEvent.click(getByTestId('signin'));
    const greetingSignInNode = await waitForElement(() =>
        getByTestId('signin')
    );
    expect(greetingSignInNode).toHaveTextContent('SignIn')
});

