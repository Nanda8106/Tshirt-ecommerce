import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { addItemToCart, loadCart, removeItemFromCart } from "./helper/CartHelper";
import ImageHelper from "./helper/ImageHelper";


const Card = ({
    product,

}) => {



    
    return (
        <div className="card">
            <ImageHelper product={product}/>
            <h3 className="product-name" title={product.name}>{product.name.length > 20 ? (product.name.substr(0, 20)+"...") : (product.name)}</h3>
            <span className="description">{product.description.length > 50 ? (product.description.substr(0,50)+"...") : (product.description)}</span><br /><br />
            <span className="price"><i className="fa fa-rupee"></i> {product.price}</span>
            {product.stock == 0 ? (<button className="out-of-stock" disabled>Out of Stock</button>) : (<Link to={`/product/${product._id}`}>View details</Link>)}<br /><br />
        </div>
    )
}

export default Card


                   
                   
                   
                   
                   