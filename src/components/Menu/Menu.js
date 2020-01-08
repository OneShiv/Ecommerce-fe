import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Menu.scss';
import CartImage from '../../assets/shopping-online.jpg';
import { signout, isAuthenticated } from '../../auth';
import { getItemsCart } from '../../helper';

const isActive = (history, path) => {
    return history.location.pathname === path;
}
const Menu = ({ history }) => {
    const [len, setLen] = useState(0);
    useEffect(() => {
        setLen(getItemsCart().length);
    }, [len]);
    console.log(isActive(history, '/') ? 'active' : '');
    return (
        <div className="header-wrapper">
            <Link to="/"><img src={CartImage} alt="my-kart" className="icon" /></Link>
            <nav className="menu">
                <ul className="menu__list">
                    <li className={`menu__item ${isActive(history, '/') ? 'active' : ''}`}><Link to="/" className="menu__link">Home</Link></li>
                    <li className={`menu__item ${isActive(history, '/cart') ? 'active' : ''}`}><Link to="/cart" className="menu__link">Cart<span style={{
                        color: 'greenyellow',
                        position: 'relative',
                        padding: 0,
                        top: '-24px',
                        left: '30px'
                    }}>{len}</span></Link></li>
                    <li className={`menu__item ${isActive(history, '/search') ? 'active' : ''}`}><Link to="/search" className="menu__link">Search</Link></li>
                    {!isAuthenticated() && <li className={`menu__item ${isActive(history, '/signup') ? 'active' : ''}`}><Link className="menu__link" to="/signup" >SigUp</Link></li>}
                    {!isAuthenticated() && <li className={`menu__item ${isActive(history, '/signin') ? 'active' : ''}`}><Link className="menu__link" to="/signin" >SigIn</Link></li>}
                    {isAuthenticated() && <li className={`menu__item`}><span
                        className="menu__link" onClick={() => signout(() => {
                            history.push("/");
                        })}>SigOut</span></li>
                    }
                    {isAuthenticated() && (isAuthenticated().user.role === 0 || isAuthenticated().user.role === 1) && <li className={`menu__item ${isActive(history, '/user/dashboard') ? 'active' : ''}`}><Link className="menu__link" to="/user/dashboard" >Dashboard</Link></li>}
                    {isAuthenticated() && isAuthenticated().user.role === 1 && <li className={`menu__item ${isActive(history, '/admin/dashboard') ? 'active' : ''}`}><Link className="menu__link" to="/admin/dashboard" >Admin Dashboard</Link></li>}
                </ul>
            </nav>
        </div>
    );
}

export default withRouter(Menu);