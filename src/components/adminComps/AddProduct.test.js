import React from 'react';
import { render, cleanup, fireEvent, waitForDomChange, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddProduct from './AddProduct';
import PImg from '../../assets/shopping-online.jpg';

const d = Math.round(100000 * Math.random());
it('render Add Product, let categories load then fill details and hit add product see if we get message', async () => {
    function FormDataMock() {
        this.append = jest.fn();
    }
    global.FormData = FormDataMock
    const { getByTestId } = render(<AddProduct />);
    fireEvent.change(getByTestId('name'), { target: { value: `product${d}` } });
    fireEvent.change(getByTestId('description'), { target: { value: `description` } });
    fireEvent.change(getByTestId('price'), { target: { value: 24442 } });
    fireEvent.change(getByTestId('quantity'), { target: { value: 20 } });
    fireEvent.change(getByTestId('upload'), { target: { value: PImg } });
    fireEvent.change(getByTestId('click'), { target: { value: PImg } });

    fireEvent.click(getByTestId('create-product'));

    const greetingProduct = await waitForElement(() =>
        getByTestId('success')
    );
    expect(greetingProduct).toHaveTextContent('Product created Successfully');
})