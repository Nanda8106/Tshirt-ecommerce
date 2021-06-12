import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import Base from "./Base";
import { getProductQuantyInCart, loadCart, removeItemFromCart, updateProductInCart } from "./helper/CartHelper";
import ImageHelper from "./helper/ImageHelper";


const Cart = () => {
    const [products, setProducts] = useState([]);
    const [value, setValue] = useState("")

    const preload = () => {
        setProducts(loadCart())
    }

    const removeFromCart = (productId) => {
        removeItemFromCart(productId);
        preload();
    }

    useEffect( () => {
        preload()
    }, [])

    const totalAmount = (products) => {
        let amount = 0;
        products.map(product => {
            amount = amount + (product.price)*(getProductQuantyInCart(product._id))
        })
        
        return amount;
    }
    const noProducts = () => {
        if(products.length == 0){
            
            return (
                <div class="no-products">
                        <p>No products added to cart, go to home and shop now</p>
                        <Link to="/" class="btn">Shop Now</Link>
                </div>
            )
        }
    }
    const increaseQuantity = (product) => {
        let quantity = getProductQuantyInCart(product._id);
        if(quantity < 10){
                quantity +=1;
                if(quantity <= product.stock){
                    updateProductInCart(product._id, product, quantity);
                    document.getElementById(`${product.name}`).innerHTML = quantity;
                    preload()
                } else{
                    alert(`we dont have ${quantity} stock, we have only ${product.stock} stock available on this product`)
                }         
        }else{
            alert("you cannot add more than 10 items")
        }   
    }

    const reduceQuantity = (product) => {
        let quantity = getProductQuantyInCart(product._id);
        if(quantity > 1){
            quantity = quantity - 1;  
            updateProductInCart(product._id, product, quantity);
            document.getElementById(`${product.name}`).innerHTML = quantity;
            preload()
        }else{
            alert("There must be one item, to remove click on the remove from cart buttom")
        }
    }

    
    return (
        <Base>
           <div class="cart">
            <div class="cart-middle">
                <div class="cart-header">
                    <h2>Shopping Cart</h2>
                </div>
                {noProducts()}
                {products.map( (product, index) => (
                    <div key={index} class="product">
                        <div class="image">
                            <ImageHelper product={product}/>
                        </div>
                        <div class="product-details">
                            <h3><Link to={`/product/${product._id}`}>{product.name}</Link></h3>
                            { product.stock > 0 ? (<p class="highlight-light-green">In Stock</p>) : (<p class="highlight-light-green">Out Of Stock</p>)}
                            <p className="size-cart">size: <span>{product.size}</span></p>
                            <span class="quantity">
                                <span class="minus" onClick={ () => {
                                    
                                }}><i class="fa fa-minus" onClick={ () => { reduceQuantity(product) }}></i></span>
                                <span class="count" id={product.name}>{getProductQuantyInCart(product._id)}</span>
                                <span class="plus" onClick={ () => { increaseQuantity(product) }}><i class="fa fa-plus"></i></span>
                            </span>
                            <button onClick={ () => { removeFromCart(product._id); }} class="remove-btn-cart">Remove From Cart</button>

                        </div>
                        <div class="product-price">
                            <p><i class="fa fa-rupee"></i> {product.price}</p>
                        </div>
                    </div>
                ))}
                
                
                {products.length !=0 && (
                    <div>
                        <div class="total-amount">
                            <div class="float-right">
                                <p>Subtotal ({products.length} items): <strong><i class="fa fa-rupee"></i> {totalAmount(products)}</strong></p>
                            </div>
                        </div>
                        <div class="buy-btn">
                            <Link to="/user/payment/braintree">Buy Now</Link>
                        </div>
                    </div>
                )}
                
            </div>

        </div>
        </Base>
    )
}

export default Cart