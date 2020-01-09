import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import { TextField, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { signin, authenticate, isAuthenticated } from '../auth';
import "./SignUp.scss";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SignIn = () => {
    const { user } = isAuthenticated();
    const [value, setValue] = useState({
        email: '',
        password: '',
        error: {
            isError: false,
            msg: ''
        },
        loading: false,
        redirectToReferrer: false
    });

    const submitHandler = (e) => {
        e.preventDefault();
        setValue({
            ...value,
            loading: true
        });
        const { email, password } = value;
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValue({
                        ...value,
                        error: {
                            isError: true,
                            msg: data.error
                        },
                        loading: false
                    });
                } else {
                    authenticate(data, () => {
                        setValue({
                            ...value,
                            redirectToReferrer: true,
                        });
                    })
                }
            });
    }

    const handleTextChange = key => event => {
        setValue({
            ...value,
            [key]: event.target.value
        });
    }
    const handleCloseSucess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setValue({
            ...value,
            success: false
        });
    };
    const redirectUser = () => {
        setTimeout(() => {
            if (value.redirectToReferrer) {
                if (user && user.role === 1) {
                    return <Redirect to="/admin/dashboard" />;
                } else {
                    return <Redirect to="/user/dashboard" />;
                }
            }
            if (isAuthenticated()) {
                return <Redirect to="/" />;
            }
        }, 5000);
    }
    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setValue({
            ...value,
            error: {
                isError: false,
                msg: ''
            }
        });
    };
    return (
        <form className="form-group" autoComplete="off">
            {value.error && <div className="errorContain">
                <Snackbar open={value.error.isError} autoHideDuration={3000} onClose={handleCloseError}>
                    <Alert data-testid="signin-error" color="error">{value.error.msg}</Alert>
                </Snackbar>
            </div>}
            {value.success && <div className="successContain">
                <Snackbar open={value.loading} autoHideDuration={1000} onClose={handleCloseSucess}>
                    <Alert data-testid="signin-success" color="info" onClose={handleCloseSucess}>
                        SignedIn
                    </Alert>
                </Snackbar>
            </div>}
            <TextField
                inputProps={{ "data-testid": "email" }}
                autoComplete="off"
                value={value.email}
                style={{ margin: 8 }}
                fullWidth
                required
                id="email"
                label="Email"
                placeholder="Please enter your email"
                onChange={handleTextChange('email')}
            />
            <TextField
                inputProps={{ "data-testid": "password" }}
                autoComplete="off"
                value={value.password}
                style={{ margin: 8 }}
                fullWidth
                id="standard-password-input"
                label="Password"
                type="password"
                onChange={handleTextChange('password')}
            />
            <Button data-testid="signin" type="submit" variant="contained" color="primary"
                onClick={submitHandler}>
                SignIn
            </Button>
            {redirectUser()}
        </form>
    )
}

export default SignIn;