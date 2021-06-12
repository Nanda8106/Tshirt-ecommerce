import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import {Link} from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { deleteProduct, getProducts } from "./helper/adminapicall";
import ImageHelper from "../core/helper/ImageHelper";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const {user, token} = isAuthenticated();

    const preload = () => {
        getProducts().then(data => {
            if(data.error){
                console.log(data.error)  //TODO:
            }else{
                setProducts(data)
            }
        })
    }
    const deleteThisProduct = (productId) => {
        deleteProduct(productId, user._id, token).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                preload()
            }
        })
    }

    useEffect( () => {
        preload();
    },[])
    return (
        <Base>
            <div className="list">
                <Link to="/admin/dashboard"  className="close" ><i className="fa fa-close"></i></Link>
                <h2 className="title text-center l-sm">Manage Products</h2>
                <h3 className="text-center l-sm">{products.length} products</h3>
                <div className="details">
                        <table width="100%" id="table">
                            <tr className="header" height="50px;">
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                            {products.map( (product, index) => (
                                <tr className="tr" key={index}>
                                    <th>{index+1}</th>
                                    <th title={product.name}>{product.name.length > 20 ? (product.name.substr(0, 20)+"...") : (product.name)}</th>
                                    <th title={product.description}>{product.description.length > 20 ? (product.description.substr(0,20)+"...") : (product.description)}</th>
                                    <th>{product.price}</th>
                                    <th>{product.stock}</th>
                                    <th><ImageHelper product={product} width={50} height={50}/></th>
                                    <th><Link to={`/admin/product/update/${product._id}`}>Update</Link> |<button onClick={ () => {
                                        deleteThisProduct(product._id)
                                    }}>Delete</button></th>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>
        </Base>
    )
}

export default ManageProducts


