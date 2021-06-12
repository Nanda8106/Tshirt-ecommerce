import React, {useState, useEffect} from "react";
import Base from "../core/Base";
import {Link} from "react-router-dom";
import { getCategories, updateProduct, getProduct} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";


const UpdateProduct = ({match}) => {

    const [values, setValues] = useState({
        name : "",
        description: "",
        price: "",
        photo: "",
        stock: "",
        categories: [],
        category: "",
        // initialCategory:"",
        // cateId:"",
        error: "",
        loading: false,
        success: false,
        createdProduct : "",
        formData : ""
    })
    const {name, description, price,photo, stock, categories, category,cateId, error, success, createdProduct, formData} = values

    const {user, token} = isAuthenticated()
    
    const preload = (productId) => {
        getProduct(productId).then(data => {
            // console.log(data);
            if(data.error){
                setValues({...values, error:data.error})
            }
            else{
                setValues({
                    ...values,
                    name:data.name,
                    description: data.description,
                    price:data.price,
                    stock:data.stock,
                    // initialCategory:data.category.name,
                    // cateId:data.category._id,
                    formData: new FormData()
                })
                preloadCategories();
            }
        })
    }

    const preloadCategories = () => {
        getCategories().then(data => {
            if(data.error){
                setValues({...values, error:data.error})
            }
            else{
                setValues({
                    
                    categories:data,
                    formData: new FormData()
                })
            }
        })
    }
    useEffect( () => {
        preload(match.params.productId)
    }, [])

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value)
        setValues({...values, [name]:value})
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, loading:true})

        // backend request fired
        updateProduct(match.params.productId, user._id, token, formData)
        .then(data => {
            if(data.error){
                setValues({...values, error:data.error,loading:false, success:false})    
            }else{
                setValues({
                    ...values,
                    name:"",
                    description:"",
                    price:"",
                    photo:"",
                    stock:"",
                    error:false,
                    cateId:"",
                    category:"",
                    // initialCategory:"",
                    loading:false,
                    success:true,
                    createdProduct:data.name,
                    // formData : new FormData()
                }) 
            }
        })
    }
    //     setTimeout(function(){
    //           return <Redirect to={'/admin/dashboard'} />;
    //     }, 5000);
    // }
    
    const successMessage = () => {
        return (
            <div style={{display:success ? "": "none"}}>
                <p className="success">Successfully updated Product {createdProduct}</p>
            </div>
        )
    }

    const errorMessage = () => {
        return (
            <div style={{display: error ? "":"none"}}>
               <p className="error">
                   {error}
               </p>
           </div>
        )
    }
    const updateProductForm = () => {
        return (
            <div className="add-product">
            <Link to="/admin/products"><i className="fa fa-close"></i></Link>
            <h4 className="form-header">Add Products Here</h4>

            <form>
                {successMessage()}
                {errorMessage()}
                    <i className="fa fa-picture-o"></i><br />
                    <input onChange={handleChange("photo")} type="file" name="photo" accept="image" placeholder="choose a file"/>

                    <i className="fa fa-product-hunt"></i><br />
                    <input onChange={handleChange("name")} value={name} placeholder="name" type="text"/>

                    <i className="fa fa-file-text-o"></i><br />
                    <textarea onChange={handleChange("description")} value={description} placeholder="Description" rows="4" cols="50"></textarea>

                    <i className="fa fa-inr"></i><br />
                    <input onChange={handleChange("price")} value={price} placeholder="Price" type="number"/>

                    <i className="fa fa-archive"></i><br />
                    <input onChange={handleChange("stock")} value={stock} placeholder="Stock" type="number"/>

                    <i className="fa fa-th"></i><br />
                    <select onChange={handleChange("category")} name="" id="">
                        
                        {/* {cateId !== "" ? (<option value={cateId}>{initialCategory}</option>) : (<option>Category</option>)} */}
                        <option disabled>Category</option>)
                        {categories && (categories.map( (cate, index) => (
                            <option key={index} value={cate._id}>{cate.name}</option>
                        )))}    
                    </select>

                <button onClick={onSubmit}>Update</button>
            </form>
        </div>
        )
    }

    return (
        <Base>
        {updateProductForm()}
        </Base>
    )
}

export default UpdateProduct;