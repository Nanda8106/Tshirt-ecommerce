import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { getProduct } from "../admin/helper/adminapicall";
import Base from "./Base";
import { addItemToCart, loadCart, removeItemFromCart } from "./helper/CartHelper";
import ImageHelper from "./helper/ImageHelper";


//TODO: https://www.cssscript.com/zoom-image-on-hover/ to zoom the image when hover
const ProductDetails = ({match}) => {

    const [product, setProduct] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    // const [redirect, setRedirect] = useState(false)
    document.title = product.name;
    const preload = () => {
        getProduct(match.params.productId).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                setProduct(data)
                setCartProducts(loadCart())
            }
        })
    }
    useEffect( () => {
        preload()
    }, [])
    const addToCart = (product) => {
        
        if(cartProducts.some(cartProduct => cartProduct._id === product._id)){  //TODO: i think this may not useful
            alert(`Alredy ${product.name} added to cart`)
        }else{
            let quantity = parseInt(document.getElementById("quantity").value);
            let size = document.getElementById("size").value;
            if(quantity <= product.stock){
                addItemToCart(product,quantity,size, () => {console.log("removed")})
                // setRedirect(true)
                preload()   
            }else{
                alert(`we dont have ${quantity} stock, we have only ${product.stock} stock available on this product`)
            }
            
        } 
    }
    // const didRedirect = (redirect) => {
    //     if(redirect){
    //         return <Redirect to="/cart"/>
    //     }
    // }
    const removeFromCart = (productId) => {
        removeItemFromCart(productId);
        
        preload();
    }
    const showButtons = (cartProducts, product) => {
        if(cartProducts.some(cartProduct => cartProduct._id === product._id)){
            return <button onClick={ () => { removeFromCart(product._id) }} className="cart-btn-red">Remove from cart</button> 
        }else{
            return <button onClick={ () => { addToCart(product)}} className="cart-btn">Add to cart</button>
        }
    }
    return (
        <Base>
            {/* {didRedirect(redirect)} */}
            
            <div class="single-product-details">
                <div class="single-product">
                    <div class="product-image">
                        <ImageHelper product={product}/>
                        
                    </div>
                    <div class="product-info">
                        <h3>{product.name}</h3>
                        <span title="4.5 out of 5">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star-half-o"></i><span>2548 ratings</span>
                        </span>
                        <div class="price-details">
                            <p>M.R.P.: <i class="fa fa-rupee underline"> 749.00</i></p>
                            <p>Price: <i class="fa fa-rupee text-bold"> {product.price}.00</i></p>
                            <p>You Save: <i class="fa fa-rupee text-light"> 150.00 (20%)</i></p>
                            <span class="tax">Inclusive of all taxes</span>
                        </div>
                        <div class="delivery-details">
                            <p>Free delivery: <span>Monday, June 14</span> Details</p>
                        </div>
                        <div class="stock">{product.stock > 0 ? ("In stock.") : ("Out of stock.")}</div>
                        <div class="size">
                            <span>Size:</span><br/>
                            <select id="size">
                                <option>select</option>
                                <option selected value="s">S</option>
                                <option value="m">M</option>
                                <option value="l">L</option>
                                <option value="xl">XL</option>
                                <option value="2xl">2XL</option>
                            </select>
                        </div>
                        <div class="color">
                            <p>Color: <span>color name</span></p>
                            <div class="clr-img">
                                <ImageHelper product={product}/>
                                <ImageHelper product={product}/>
                                <ImageHelper product={product}/>
                                <ImageHelper product={product}/>
                                
                            </div>
                        </div>
                        <div class="desc">
                            <p>{product.description}</p>
                        </div>
                    </div>
                </div>
                <div class="cart-det">
                    <div class="cart-box">
                        <div class="cart-qty">
                            Quantity: <select id="quantity">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <div class="cart-wish">
                        {showButtons(cartProducts, product)}
                        </div>
                        <div class="cart-wish">
                            <button class="wish-btn">Add to wish List</button>
                        </div>
                    </div>
                </div>
            </div>
        </Base>
    )
}

export default ProductDetails;