import React from 'react';
import { Card, CardHeader, CardMedia, CardContent, Button, CardActions } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import ShowImage from './ShowImage';
import { addItem } from '../helper';
const ProductCard = (props) => {
    const { name, description, price, createdAt, _id } = props;
    return (
        <Card style={{ maxHeight: '500px', minHeight: '500px', }}>
            <Link to={`/product/${_id}`}><CardHeader
                title={name}
                style={{
                    minHeight: '80px',
                    maxHeight: '100px',
                    textOverflow: 'ellipsis'
                }}
            />
            </Link>
            <ShowImage item={props} url="product" />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" style={{
                    minHeight: '80px',
                    maxHeight: '100px',
                    overflow: 'scroll'
                }}>
                    {description}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    price: {price}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="add to cart">
                    <CartIcon onClick={() => {
                        addItem({ ...props })
                        window.location.reload()
                    }} />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default ProductCard;