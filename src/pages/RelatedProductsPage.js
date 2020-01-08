import React, { useState, useEffect } from 'react';
import { getRelatedProducts } from '../api/generic';
import ProductsGrid from '../components/ProductGrid';
const RelatedProducts = (props) => {
    const { _id } = props;
    console.log(props);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    useEffect(() => {
        getRelatedProducts(_id).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProducts(data.products)
            }
        });
    }, [_id])
    return (
        <React.Fragment>
            <h3 style={{ color: 'white' }}>Related Products</h3>
            {products && <ProductsGrid products={products} />}
        </React.Fragment>
    )
}

export default RelatedProducts;