import React, { useState, useEffect } from 'react';
import { getItemsCart, removeItem } from '../helper';

import './Cart.scss';

const Cart = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        setItems(getItemsCart);
    }, [])
    let total = 0;
    return (
        <div>
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
                Cart Total = Rs {total}.
            </div>
        </div>
    );
}

export default Cart;