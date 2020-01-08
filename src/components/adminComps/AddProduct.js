import React, { useState, useEffect } from 'react';
import { TextField, Button, Snackbar, MenuItem, Input } from '@material-ui/core'
import { isAuthenticated } from '../../auth';
import MuiAlert from '@material-ui/lab/Alert';
import { createProduct } from '../../api/admin';
import { getCategories } from '../../api/generic';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const initialObject = {
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    image: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: ''
};

const AddProduct = () => {
    const { user, token } = isAuthenticated();
    const [productData, setProductData] = useState(initialObject);

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        image,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = productData;

    // load categories and set formData

    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setProductData({
                    ...productData,
                    error: data.error
                });
            } else {
                setProductData({
                    ...productData,
                    categories: data.categories,
                    formData: new FormData()
                });
            }
        })
    }
    useEffect(() => {
        initCategories();
    }, []);

    const submitHandler = (event) => {
        event.preventDefault();
        setProductData({
            ...productData,
            error: '',
            loading: true
        });
        createProduct(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setProductData({
                        ...productData,
                        error: data.error
                    });
                } else {
                    setProductData({
                        ...initialObject,
                        success: true,
                        formData: new FormData(),
                        createProduct: data.name
                    });
                }
            });
    }

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setProductData({
            ...productData,
            error: '',
            success: false
        });
    };
    const changeHandler = key => event => {
        const value = key === 'image' ? event.target.files[0] : event.target.value;
        formData.set(key, value);
        setProductData({
            ...productData,
            [key]: value
        });
    }

    const categoryArray = productData.categories.map(category => ({
        label: category.name,
        value: category._id
    }));

    return (
        <form className="form-group" autoComplete="off">
            {productData.error && <div className="errorContain">
                <Snackbar open={productData.error} autoHideDuration={3000} onClose={handleCloseError}>
                    <Alert color="error">{error}</Alert>
                </Snackbar>
            </div>}
            {productData.success && <div className="successContain">
                <Snackbar open={productData.success} autoHideDuration={2000} onClose={handleCloseError}>
                    <Alert >Product created Successfully</Alert>
                </Snackbar>
            </div>}
            <h4>Product Form</h4>
            <TextField
                autoComplete="off"
                value={name}
                style={{ margin: 8 }}
                fullWidth
                required
                id="product-name"
                label="Name"
                placeholder="Please enter name for category"
                onChange={changeHandler('name')}
            />
            <TextField
                multiline
                rows={2}
                autoComplete="off"
                value={description}
                style={{ margin: 8 }}
                fullWidth
                required
                id="product-desc"
                label="Description"
                onChange={changeHandler('description')}
            />
            <TextField
                inputProps={{
                    type: 'number',
                    min: 0,
                    max: 100000
                }}
                autoComplete="off"
                value={price}
                style={{ margin: 8 }}
                fullWidth
                required
                id="product-price"
                label="Price"
                onChange={changeHandler('price')}
            />
            <TextField
                style={{ margin: 8 }}
                fullWidth
                id="select category"
                select
                label="Select"
                value={category}
                onChange={changeHandler('category')}
            >
                {categoryArray.map(category => (
                    <MenuItem key={category.value} value={category.value}>
                        {category.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                inputProps={{
                    type: 'number',
                    min: 0,
                    max: 5
                }}
                autoComplete="off"
                value={quantity}
                style={{ margin: 8 }}
                fullWidth
                required
                id="product-quantity"
                label="Quantity"
                onChange={changeHandler('quantity')}
            />
            <TextField
                autoComplete="off"
                value={shipping}
                style={{ margin: 8 }}
                fullWidth
                required
                id="product-shipping"
                label="Shipping"
                onChange={changeHandler('shipping')}
            />
            <label className="file-wrap" style={{
                display: 'block',
                border: '1px black dotted',
                padding: '16px',
                margin: '8px'
            }}>
                <input style={{ fontSize: '24px' }}
                    type="file" name="image" accept="/image/*" onChange={changeHandler('image')} />
            </label>
            <Button type="submit" variant="contained" color="primary"
                onClick={submitHandler}>
                Create product
            </Button>
        </form>
    )
}

export default AddProduct;
