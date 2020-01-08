import React, { useState, useEffect } from 'react';
import { getItemsCart, removeItem, removeAll } from '../helper';
import { Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { createOrder } from '../api/admin';
import { isAuthenticated } from '../auth';
import './Cart.scss';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Cart = () => {
    let total = 0;
    const { user, token } = isAuthenticated();
    const [items, setItems] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        setItems(getItemsCart);
    }, []);
    const orderhandler = () => {
        createOrder(user._id, token, items, total).then(response => {
            if (response.error) {
                setError(true);
            } else {
                setSuccess(true);
                setItems([]);
                removeAll();
                // window.location.reload();
            }
        });
    }
    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(false);
    };
    const handleCloseSucess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
    };
    return (
        <div>
            {error && <div className="errorContain">
                <Snackbar open={error} autoHideDuration={3000} onClose={handleCloseError}>
                    <Alert color="error">Something went wrong</Alert>
                </Snackbar>
            </div>}
            {success && <div className="successContain">
                <Snackbar open={success} autoHideDuration={3000} onClose={handleCloseSucess}>
                    <Alert color="info" onClose={handleCloseSucess}>
                        Order Placed SuccssFully.
                    </Alert>
                </Snackbar>
            </div>}
            <div className="Cart-wrap">
                <div>
                    PRODUCT
                </div>
                <div>
                    QUANTITY
                </div>
                <div>Price</div>
                <div>Overall price</div>
                <div />
                {items &&
                    items.map(item => {
                        total = total + item.count * item.item.price;
                        return (
                            <React.Fragment key={item.item._id}>
                                <div>
                                    {item.item.name}
                                </div>
                                <div>
                                    {item.count}
                                </div>
                                <div>{item.item.price}</div>
                                <div>{item.item.price * item.count}</div>
                                <div>
                                    <button onClick={() => {
                                        removeItem(item.item._id);
                                        window.location.reload();
                                    }}>Remove</button>
                                </div>
                            </React.Fragment>
                        );
                    })
                }
            </div>

            <div className="total">
                <p>Cart Total = Rs {total}.</p>
                {items.length !== 0 && <Button variant="contained" color="primary"
                    onClick={orderhandler}>
                    Order
            </Button>}
            </div>
        </div>
    );
}

export default Cart;