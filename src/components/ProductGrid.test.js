import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductGrid from './ProductGrid';
import { EXPECTED_COLOR } from 'jest-matcher-utils';

afterEach(cleanup);

it('renders blank if products array is blank', () => {
    const { getByTestId } = render(<ProductGrid products={[]} />);
    expect(getByTestId('blank')).toHaveTextContent('No results');
})

it('renders 1 child comps', () => {
    const { getByTestId } = render(<ProductGrid products={[{
        _id: 1,
        name: 'prod1',
        description: 'desc',
        price: 1,
        shipping: '1day',
    }]} />);
    expect(getByTestId('products-grid').children.length).toBe(1);
})