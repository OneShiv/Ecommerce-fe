import React, { useState, useEffect } from 'react';
import { getProducts } from '../api/generic';
import ProductGrid from '../components/ProductGrid';
import { Paper, Tab, Tabs, } from '@material-ui/core';

import CategoryMenu from '../components/Menu/CategoryMenu';

const Home = () => {
    const [value, setValue] = React.useState(0);
    const [productBySale, setProductBySale] = useState([]);
    const [productByArrival, setProductByArrival] = useState([]);
    const [error, setError] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const loadProductsBySale = () => {
        getProducts('sold', 'desc', 10)
            .then(data => {
                console.log(data);
                if (error) {
                    setError(error);
                } else {
                    setProductBySale(data.products)
                }
            })
    }

    const loadProductsByArrival = () => {
        getProducts('createdAt', 'desc', 10)
            .then(data => {
                if (error) {
                    setError(error);
                } else {
                    setProductByArrival(data.products)
                }
            })
    }

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySale();
    }, [])
    return (
        <div>
            <CategoryMenu />
            <Paper square style={{
                margin: '16px'
            }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="secondary"
                    aria-label="icon label tabs example"
                >
                    <Tab label="MOST SOLD" />
                    <Tab label="RECENTS" />
                </Tabs>
            </Paper>
            {value === 0 && <ProductGrid products={productBySale} />}
            {value === 1 && <ProductGrid products={productByArrival} />}
        </div>
    )
}

export default Home;