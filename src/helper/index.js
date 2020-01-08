export const addItem = (item, next) => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));

            // check if item already exists

            let elem = cart.find(prod => prod.item._id === item._id);
            // if product found just increment count
            console.log("elemen:", elem)
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
                console.log("Updted", cart);
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
    return JSON.parse(localStorage.getItem('cart'));
}

export const removeItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    cart.map((prod, index) => {
        if (prod.item._id === id) {
            cart.splice(index, 1);
        }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
}