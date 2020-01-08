import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterSort from './FilterSort';

it('renders FilterSort component', () => {
    const { asFragment } = render(<FilterSort />);
    expect(asFragment).toMatchSnapshot();
})