import React from 'react';
import { API } from '../config';
import './ShowImage.scss';

const ShowImage = ({ item, url }) => {
    return (<div className="product-img">
        <img src={`${API}/${url}/image/${item._id}`} alt={item.name} classname="prod-img" />
    </div>);
}

export default ShowImage;