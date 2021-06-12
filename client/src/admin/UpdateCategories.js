import React, {useState, useEffect} from "react";
import Base from "../core/Base";
import {Link} from "react-router-dom";
import {getCategory, updateCategory} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";


const UpdateCategory = ({match}) => {

    const [values, setValues] = useState({
        name : "",
        error: "",
        success: false,
        updatedCategory : ""
    })
    const {name, error, success, updatedCategory} = values

    const {user, token} = isAuthenticated()

    const preload = (categoryId) => {
        getCategory(categoryId).then(data => {
            // console.log(data);
            if(data.error){
                setValues({...values, error:data.error})
            }
            else{
                setValues({
                    ...values,
                    name:data.name
                })
                
            }
        })
    }

    
    useEffect( () => {
        preload(match.params.categoryId)
    },[])

    const handleChange = name => event => {
        setValues({...values, error:false, success:false, [name]:event.target.value})
    }
    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error:false, success:false})

        // backend request fired
        updateCategory(match.params.categoryId, user._id, token, {name})
        .then(data => {
            if(data.error){
        setValues({...values, error:data.error, success:false})
                
            }else{
                setValues({
                    ...values,
                     error:false,
                     name:"",
                     success:true,
                     updatedCategory: data.name
                }) 
            }
        })
        

    }
    const successMessage = () => {
        return (
            <div style={{display:success ? "": "none"}}>
                <p className="success">Successfully updated Category {updatedCategory}</p>
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
    //     setTimeout(function(){
    //           return <Redirect to={'/admin/dashboard'} />;
    //     }, 5000);
    // }
    
    
    const updateProductForm = () => {
        return (
            <div className="add-category">
                <Link to="/admin/categories" ><i className="fa fa-close"></i></Link>
                <h4 className="form-header">Update Category Here</h4>
                <form>
                    {successMessage()} 
                    {errorMessage()}
                    
                    <label className="text-light">Name</label><br/>
                    <i className="fa fa-th"></i><br />
                    <input onChange={handleChange("name")} value={name} type="text" required/>
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

export default UpdateCategory;