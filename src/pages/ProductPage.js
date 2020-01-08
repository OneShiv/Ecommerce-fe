import React, { useState, useEffect } from 'react';
import { getProductById } from '../api/generic';
import ProductCard from '../components/ProductCard';
import CategoryMenu from '../components/Menu/CategoryMenu';
import RelatedProductsPagePage from './RelatedProductsPage';
const ProductPage = (props) => {

    const [error, setError] = useState(false);
    const [productdata, setProductdata] = useState({});

    const { productId } = props.match.params;
    console.log(props);
    useEffect(() => {
        getProductById(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductdata(data);
            }
        })
    }, [productId]);
    return (
        <div>
            <CategoryMenu />
            {error && 'Something wriong happened'}
            {!error && <ProductCard {...productdata} />}
            <RelatedProductsPagePage {...productdata} />
        </div>
    )
}

export default ProductPage;