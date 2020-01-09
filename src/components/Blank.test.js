import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Blank from './Blank';

afterEach(cleanup);

it('renders blank page', () => {
    const { getByTestId } = render(<Blank />);
    expect(getByTestId('blank')).toHaveTextContent('No results');
})
