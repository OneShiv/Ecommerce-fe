import React, { useState } from 'react';
import { TextField, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { signup } from '../auth';
import "./SignUp.scss";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SignUp = () => {
    const [value, setValue] = useState({
        name: '',
        email: '',
        password: '',
        error: {
            isError: false,
            msg: ''
        },
        success: false
    });

    const submitHandler = (e) => {
        e.preventDefault();
        const { name, email, password } = value;
        signup({ name, email, password })
            .then(data => {
                if (data.err) {
                    setValue({
                        ...value,
                        error: {
                            isError: true,
                            msg: data.err
                        }
                    });
                } else {
                    setValue({
                        ...value,
                        name: '',
                        email: '',
                        password: '',
                        success: true
                    })
                }
            })
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
                    <Alert data-testid="signup-error" color="error">{value.error.msg}</Alert>
                </Snackbar>
            </div>}
            {value.success && <div className="errorContain">
                <Snackbar open={value.success} autoHideDuration={3000} onClose={handleCloseSucess}>
                    <Alert data-testid="signup-success" onClose={handleCloseSucess} color="success">
                        User Successfully created
                </Alert>
                </Snackbar>
            </div>}
            <TextField
                inputProps={{ "data-testid": "name" }}
                value={value.name}
                style={{ margin: 8 }}
                fullWidth required
                id="name"
                label="Name"
                placeholder="Please enter your name"
                onChange={handleTextChange('name')}
            />
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
            <Button data-testid="register" type="submit" variant="contained" color="primary"
                onClick={submitHandler}>
                Register
            </Button>
        </form>
    )
}

export default SignUp;