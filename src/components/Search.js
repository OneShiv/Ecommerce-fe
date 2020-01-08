import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { getProductBySearch } from '../api/generic';
import Card from './ProductCard';
import ProductGrid from './ProductGrid';

const Search = (props) => {
    const [data, setData] = useState({
        search: '',
        results: [],
        searched: false
    });

    useEffect(() => {

    }, []);

    const handleChange = key => event => {
        debugger;
        setData({
            ...data,
            [key]: event.target.value,
            searched: false
        });
    }

    const searchData = () => {
        if (data.search) {
            getProductBySearch({
                name: data.search || undefined
            }).then(response => {
                if (response.error) {
                    console.log(response.error);
                } else {
                    setData({
                        ...data,
                        results: response.products,
                        searched: true
                    });
                }
            })
        }
    }
    const submitHandler = (e) => {
        debugger;
        e.preventDefault();
        searchData();
    }
    return (
        <div className="search-results">
            <form className="form-group" autoComplete="off" onSubmit={submitHandler}>
                <TextField
                    inputProps={{ "data-testid": "search-text" }}
                    autoComplete="off"
                    value={data.search}
                    style={{ margin: 8 }}
                    fullWidth
                    required
                    id="search"
                    label="Search"
                    placeholder="Search product"
                    onChange={handleChange('search')}
                />
                <Button data-testid="search-btn" type="submit" variant="contained" color="primary"
                >
                    Search
                </Button>
            </form>
            <h2 style={{ color: '#38b692' }}>Results</h2>
            <p data-testid="search" style={{ color: '#00B4DB' }}>{data.results.length} products found</p>
            <ProductGrid products={data.results} history={props.history} />
        </div>
    )
}

export default Search;

