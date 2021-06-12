import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";


const AddCategory = () => {
    const [values, setValues] = useState({
        name : "",
        error: "",
        success: false,
        createdCategory : ""
    })
    const {name, error, success, createdCategory} = values

    const {user, token} = isAuthenticated()


    const handleChange = name => event => {
        setValues({...values, error:false, success:false, [name]:event.target.value})
    }
    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error:false, success:false})

        // backend request fired
        createCategory(user._id, token, {name})
        .then(data => {
            if(data.error){
        setValues({...values, error:data.error, success:false})
                
            }else{
                setValues({
                    ...values,
                     error:false,
                     name:"",
                     success:true,
                     createdCategory: data.name
                }) 
            }
        })
        

    }
    const successMessage = () => {
        return (
            <div style={{display:success ? "": "none"}}>
                        <p className="success">Successfully created Category {createdCategory}</p>
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
    const myCategoryForm = () => {
        return (
            <div className="add-category">
                <Link to="/admin/dashboard" ><i className="fa fa-close"></i></Link>
                <h4 className="form-header">Add Category Here</h4>
                <form>
                    {successMessage()} 
                    {errorMessage()}
                    
                        <label className="text-light">Name</label><br/>
                        <i className="fa fa-th"></i><br />
                        <input onChange={handleChange("name")} value={name} type="text" required/>
                    
                    <button onClick={onSubmit}>Add</button>
                </form>
        </div>
        )
    }
    return (
        <Base>
            {myCategoryForm()}
        </Base>
    )
}

export default AddCategory