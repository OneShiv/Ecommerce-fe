import { API } from '../config';

export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            name: category
        })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
}

export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
}

export const createOrder = (userId, token, orderData, amount) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            order: {
                products: orderData,
                amount: amount,
                transaction_id: Date.now()
            }
        })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
}