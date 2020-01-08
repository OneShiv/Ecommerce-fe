import React from 'react';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth';
import './UserDashBoard.scss';

const DashBoard = () => {
    const { user: {
        name,
        email,
        _id,
        role
    } } = isAuthenticated();

    const UserLinks = () => {
        return (
            <Card className="card">
                <CardContent>
                    <h4>User Links</h4>
                    <ul className="user__links__list">
                        <li className="user__link__item">
                            <Link className="nav-link" to="/cart">Cart</Link>
                        </li>
                        <li className="user__link__item">
                            <Link className="nav-link" to="/profile/update">Update Profile</Link>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        )
    }
    return (
        <div className="dashboard">
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                    <Paper>
                        {UserLinks()}
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <Paper>
                        <Card className="card">
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    User Information
                </Typography>
                                <Typography variant="h5" component="h2">
                                    Welcome {name} !
                </Typography>
                                <Typography variant="h5" component="h2">
                                    Email : {email}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    Role :{role === 1 ? 'Admin' : 'Registered User'}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card style={{
                            marginTop: '40px'
                        }} className="card">
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Purchase History
                </Typography>
                                <ul>
                                    <li>Product 1</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default DashBoard;