import React from 'react';
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from './Search';

afterEach(cleanup);

it('displays 0 products on mount', () => {
    const { getByTestId } = render(<Search />);
    expect(getByTestId('search')).toHaveTextContent('0 products found');
});

it('on writing vivo and clicking search', async () => {
    const { getByTestId, getByText } = render(<Search />);
    fireEvent.change(getByTestId('search-text'), { target: { value: 'vivo' } });
    fireEvent.click(getByTestId('search-btn'));
    const newEl = await waitForElement(() => getByText('1 products found'));
    expect(newEl).toHaveTextContent('1 products found');
});