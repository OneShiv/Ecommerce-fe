import React, { useState, useEffect } from 'react';
import CategoryMenu from '../components/Menu/CategoryMenu';
import { getProductsByCategory } from '../api/generic';
import ProductGrid from '../components/ProductGrid';
import FilterSort from '../components/FilterSort';
const CategoryPage = (props) => {
    const { categoryId } = props.match.params;
    const [products, setProducts] = useState([]);
    const [catProducts, setCatProducts] = useState([]);
    const [error, setError] = useState('');
    const [sortBy, setSortBy] = useState('asc');
    const [filterByRange, setFilterByRange] = useState([0, 100]);
    useEffect(() => {
        getProductsByCategory(categoryId, sortBy, filterByRange).then(data => {
            if (data.error) {
                setError(error);
            } else {
                setProducts(data.products);
                setCatProducts(data.products);
                setSortBy('asc');
                setFilterByRange([0, 100]);
            }
        })
    }, [categoryId])
    return (
        <div>
            <CategoryMenu />
            {catProducts.length && <FilterSort order={sortBy} range={filterByRange} setOrderCb={value => {
                setSortBy(value)
                let sortedProds = catProducts.sort((p1, p2) => {
                    if (p1.price < p2.price) {
                        return 1;
                    } else if (p1.price < p2.price) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                if (value === 'asc') {
                    if (sortBy === 'desc') {
                        setCatProducts(sortedProds.reverse());
                    } else {
                        setCatProducts(sortedProds);
                    }
                } else {
                    setCatProducts(sortedProds.reverse());
                }
            }} setRangeCb={(value) => {
                console.log(products);
                setFilterByRange(value);
                let newFilteredValues = products.filter(product => product.price > filterByRange[0] * 1000 && product.price < filterByRange[1] * 1000);
                setCatProducts(newFilteredValues);
            }} />}
            <ProductGrid products={catProducts} />
        </div>
    )
}

export default CategoryPage;