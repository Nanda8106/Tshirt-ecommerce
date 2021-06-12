import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import Base from "./Base";
import Card from "./Card";
import {getProducts} from "../admin/helper/adminapicall"
import { checkCartPresent } from "./helper/CartHelper";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    
    document.title = "Eccomt.in";
    const preload = () => {
        getProducts().then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setProducts(data)
                
            }
        })
    }

    useEffect( () => {
        preload()
    }, [])
    return (
        <Base>
           <div className="section">
            <div className="cards">
               {products.map( (product, index) => (
                   <Card product={product} key={index}/>
               ))} 
            </div>
        </div>
        </Base>
    )
}

export default Home