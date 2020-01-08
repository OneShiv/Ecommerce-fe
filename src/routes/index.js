import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from '../container/SignIn';
import SignUp from '../container/SignUp';
import Home from '../pages/Home';
import Menu from '../components/Menu/Menu';
import PrivateRoute from '../auth/PrivateRoutes';
import AdminRoute from '../auth/AdminRoute';
import DashBoard from '../container/UserDashboard';
import AdminDashBoard from '../container/AdminDashBoard';
import AddCategory from '../components/adminComps/AddCategory';
import AddProduct from '../components/adminComps/AddProduct';
import CategoryPage from '../pages/CategoryPage';
import ProductPage from '../pages/ProductPage';
import Search from '../components/Search';
import CartPage from '../pages/CartPage';

const Routes = () => {
    return (
        <Router>
            <Menu />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/cart" exact component={CartPage} />
                <Route path="/signin" exact component={SignIn} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/search" exact component={Search} />
                <Route path="/product/:productId" component={ProductPage} />
                <Route path="/category/:categoryId" component={CategoryPage} />
                <PrivateRoute path="/user/dashboard" exact component={DashBoard} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
                <AdminRoute path="/create/category" exact component={AddCategory} />
                <AdminRoute path="/create/product" exact component={AddProduct} />
            </Switch>
        </Router>
    );
}

export default Routes;