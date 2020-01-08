import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getCategories } from '../../api/generic';

const isActive = (history, path) => {
    return history.location.pathname === path;
}
const Menu = ({ history }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then(data => {
            setCategories(data.categories);
        });
    }, [])
    return (
        <div className="category-wrapper">
            <nav className="menu">
                <ul className="menu__list">
                    <span style={{ color: 'white', curosr: 'none' }}>Categories: </span>
                    {categories.map(category => {
                        return (
                            <li className={`menu__item ${isActive(history, `/category/${category._id}`) ? 'active' : ''}`}><Link to={`/category/${category._id}`} className="menu__link">{category.name}</Link></li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    );
}

export default withRouter(React.memo(Menu));