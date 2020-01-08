export const addItem = (item, next) => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));

            // check if item already exists

            let elem = cart.find(prod => prod.item._id === item._id);
            // if product found just increment count
            if (elem) {
                elem.count++;
                // now go for uniqueness
                cart = cart.reduce((acc, currProd) => {
                    debugger;
                    if (currProd.item._id === item._id) {
                        acc.push(elem);
                        return acc;
                    } else {
                        acc.push(currProd);
                        return acc;
                    }
                }, []);
                localStorage.setItem('cart', JSON.stringify(cart));
            } else {
                cart = cart.concat({
                    item,
                    count: 1
                });
                localStorage.setItem('cart', JSON.stringify(cart));
            }

        } else {
            localStorage.setItem('cart', JSON.stringify(cart.concat({
                item,
                count: 1
            })))
        }
    }
}

export const getItemsCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        } else {
            return [];
        }
    } else {
        return []
    }
}

export const removeItem = (id) => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            const cart = JSON.parse(localStorage.getItem('cart'));

            cart.map((prod, index) => {
                if (prod.item._id === id) {
                    cart.splice(index, 1);
                }
            });
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            return [];
        }
    }
}
export const removeAll = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            localStorage.removeItem('cart');
        }
    }
}