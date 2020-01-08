import { API } from '../config';
import queryString from 'query-string';

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
}

export const getProductsByCategory = (categoryId) => {
    return fetch(`${API}/products/category?category=${categoryId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    }).then(response => {
        return response.json();
    })
        .catch(err => {
            return err;
        })
}

export const getProductById = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    }).then(response => {
        return response.json();
    })
        .catch(err => {
            return err;
        })
}

export const getProducts = (sortBy, order, limit) => {
    order = (order === 'asc' || order === 'desc') ? order : 'desc';
    if (typeof limit === 'String') {
        limit = parseInt(limit);
    } else {
        limit = 10;
    }
    return fetch(`${API}/products?sortBy=${sortBy}&order=${order}&limit=${limit}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        })
}

export const getProductBySearch = (params) => {
    const query = queryString.stringify(params);
    return fetch(`${API}/products/search?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        })
}

export const getRelatedProducts = (prodId) => {
    return fetch(`${API}/products/related/${prodId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        })
}