import React, { useState } from 'react';
import { TextField, Button, Snackbar } from '@material-ui/core'
import { isAuthenticated } from '../../auth';
import MuiAlert from '@material-ui/lab/Alert';
import { createCategory } from '../../api/admin';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const { user, token } = isAuthenticated();

    const submitHandler = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        createCategory(user._id, token, name)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setName('');
                    setError('');
                    setSuccess(true);
                }
            })
    }
    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setError('');
        setSuccess(false);
    };
    return (
        <form className="form-group" autoComplete="off">
            {error && <div className="errorContain">
                <Snackbar open={error} autoHideDuration={3000} onClose={handleCloseError}>
                    <Alert color="error">{error}</Alert>
                </Snackbar>
            </div>}
            {success && <div className="successContain">
                <Snackbar open={success} autoHideDuration={2000} onClose={handleCloseError}>
                    <Alert >Category created Successfully</Alert>
                </Snackbar>
            </div>}
            <TextField
                autoComplete="off"
                value={name}
                style={{ margin: 8 }}
                fullWidth
                required
                id="category-name"
                label="Category Name"
                placeholder="Please enter name for category"
                onChange={(e) => {
                    setError('');
                    setName(e.target.value)
                }}
            />
            <Button type="submit" variant="contained" color="primary"
                onClick={submitHandler}>
                Create category
            </Button>
        </form>
    )
}

export default AddCategory;