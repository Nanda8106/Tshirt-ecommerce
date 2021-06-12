import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getCategories, createProduct } from "./helper/adminapicall";



const AddProduct = () => {

    const [values, setValues] = useState({
        name : "",
        description: "",
        price: "",
        photo: "",
        stock: "",
        categories: [],
        category: "",
        error: "",
        loading: false,
        success: false,
        createdProduct : "",
        formData : ""
    })
    const {name, description, price, stock,photo, categories,category,loading, error, success, createdProduct, formData} = values

    const {user, token} = isAuthenticated()
    
    const preload = () => {
        getCategories().then(data => {
            // console.log(data);
            if(data.error){
                setValues({...values, error:data.error})
            }
            else{
                setValues({...values, categories:data, formData: new FormData()})  // An HTML <form> element — when specified, the FormData object will be populated with the form's current keys/values using the name property of each element for the keys and their submitted value for the values. It will also encode file input content.
            }
        })
    }

    useEffect( () => {
        preload()
    }, [])

    const handleChange = name => event => {
        let value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value)
        setValues({...values, [name]:value})
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, loading:true})

        // backend request fired
        createProduct(user._id, token, formData)
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
                    category:"",
                    error:false,
                    loading:false,
                    success:true,
                    createdProduct:data.name,
                }) 
            }
        })
    }
    const successMessage = () => {
        return (
            <div style={{display:success ? "": "none"}}>
                <p className="success">Successfully created Product {createdProduct}</p>
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
    const myProductForm = () => {
        return (
            <div className="add-product">
            <Link to="/admin/dashboard" ><i className="fa fa-close"></i></Link>
            <h4 className="form-header">Add Products Here</h4>

            <form>
                {successMessage()}
                {errorMessage()}
                    <i className="fa fa-picture-o"></i><br />
                    <input onChange={handleChange("photo")} type="file" accept="image" placeholder="Choose a image"/>
               
                    <i className="fa fa-product-hunt"></i><br />
                    <input onChange={handleChange("name")} value={name} placeholder="Name" type="text"/>
                
                    <i className="fa fa-file-text-o"></i><br />
                    <textarea onChange={handleChange("description")} value={description} placeholder="Description" rows="4" cols="50"></textarea>
                
                    <i className="fa fa-inr"></i><br />
                    <input onChange={handleChange("price")} value={price} placeholder="Price" type="number"/>
                
                    <i className="fa fa-archive"></i><br />
                    <input onChange={handleChange("stock")} value={stock} placeholder="Stock" type="number"/>
                
                    <i className="fa fa-th"></i><br />
                    <select onChange={handleChange("category")} placeholder="Category" name="" id="">
                        <option>Select</option>
                        {categories && (categories.map( (cate, index) => (
                            <option key={index} value={cate._id}>{cate.name}</option>
                        )))}    
                    </select>
                

                <button onClick={onSubmit}>Create</button>
            </form>
        </div>
        )
    }

    return (
        <Base>
            {myProductForm()}
        </Base>
    )
}

export default AddProduct