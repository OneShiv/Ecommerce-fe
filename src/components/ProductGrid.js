import React from 'react';
import Card from './ProductCard';
import { Grid, Paper } from '@material-ui/core'
import ProductCard from './ProductCard';
import Blank from './Blank';

const ProductGrid = ({ products, history }) => {
    if (!products.length) {
        return <Blank />
    }
    return (
        <Grid container spacing={3} style={{ padding: '32px' }}>
            {products.map(product => (
                <Grid data-testid="products-grid" item xs={12} sm={3} key={product._id}>
                    <Paper><ProductCard history={history} {...product} /></Paper>
                </Grid>
            ))}
        </Grid>
    )
}

export default ProductGrid;