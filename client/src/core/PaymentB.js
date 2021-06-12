import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "./Base"
import { giveMeToken, processPayment } from "./helper/PaymentBHelper";
import DropIn from "braintree-web-drop-in-react";
import { getProductQuantyInCart, loadCart, makeCartEmpty } from "./helper/CartHelper";
import { createOrder } from "./helper/OrderHelper";

const PaymentB = () => {
    const [info, setInfo] = useState({
        error : "",
        success : false,
        clientToken : null,
        loading : false,
        instance : {}
    });

    var [products, setProducts] = useState([])
    

    var {user, token} = isAuthenticated();
    var getToken = (userId, token) => {
        giveMeToken(userId, token).then(info => {
            if(info.error){
                setInfo({...info, error:info.error})
            }else{
                var clientToken = info.clientToken;
                setInfo({clientToken})
                setProducts(loadCart())
            }
        })
    }

    useEffect( () => {
        getToken(user._id, token);
        
    }, []);

    const onPurchase = () => {
        getToken(user._id, token)
        setInfo({loading:true})
        let nonce;
        let getNonce = info.instance
            .requestPaymentMethod()
            .then(data => {
                nonce= data.nonce
                const paymentData = {
                    paymentMethodNonce:nonce,
                    amount: getAmount()
                }
                processPayment(user._id, token, paymentData)
                .then(response => {
                    setInfo({...info, success:response.success, loading:false})
                    var orderData = {
                        products: products,
                        transaction_id: response.transaction.id,
                        total_amount : response.transaction.amount
                    }
                   createOrder(user._id, token, orderData);
                   makeCartEmpty( () => {
                       console.log("successfully removed from cart")
                   }) 
                })
            }).catch(error => {
                    setInfo({loading:false, success:false})
                })
    }

    var getAmount = () => {
        let amount = 0;
        products.map( product => {
            amount = amount + (product.price) * (getProductQuantyInCart(product._id))
        })
        return amount;
    }

    return (
        <Base>
            
             <div className="under-construction">
                <h3>Payment Method is in Underconstruction</h3>
            </div>   
                    
            <div className="paymentform">
                {info.clientToken !== null && products.length > 0 && (
                    <div>
                    <DropIn
                      options={{ authorization: info.clientToken }}
                      onInstance={(instance) => (info.instance = instance)}
                    />
                    <button className="pay-btn" onClick={onPurchase}>Pay <i className="fa fa-rupee"></i>{getAmount()}</button>
                  </div>
                ) }
            </div>
                
            
        </Base>
    )
}

export default PaymentB