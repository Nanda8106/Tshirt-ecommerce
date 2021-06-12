import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import ImageHelper from "../core/helper/ImageHelper";
import { userPurchaseList } from "./helper/UserHelper";

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const {user, token} = isAuthenticated();

    const preload = () => {
        userPurchaseList(user._id, token).then(data => {       
                setOrders(data)   
            
        })
    }
    useEffect( () => {
        preload()
    }, [])
    
    return (
        <Base>
            {orders.map( (order, index) => (
                <div className="productform" key={index}>
                    <p>{index+1} order</p>
                    <ImageHelper product={order}/>
                    <p>{order.name}</p>
                    <p>{order.description}</p>
                    <p><i className="fa fa-rupee"></i>{order.price}</p>
                    <p>{order.quantity}</p>
                    <p>{order.date}</p>
                    <hr />
                    
                </div>
            ))}
        </Base>
    )
}

export default UserOrders;