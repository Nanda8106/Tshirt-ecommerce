import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../auth/helper";
import Base from "../core/Base";
import "../styles.css"


const Signin = () => {
    const [values, setValues] = useState({
        email: "nandu@gmail.com",
        password : "N@nda8106",
        error:"",
        success : false,
        loading : false,
        redirect : false,   
    })

    const {email, password, error, success, loading, redirect} = values;
    const {user, token} = isAuthenticated();

    const handleChange = name => event => {
        setValues({...values, error:false, success:false, [name]:event.target.value})
    }
    
    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error:false, success:false, loading:true})
        signin({email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error:data.error, success:false, loading:false})
            }
            else{
                authenticate(data, () => {
                    setValues({
                        ...values,
                        email:"",
                        password:"",
                        error:"",
                        loading:false,
                        success:true,
                        redirect:true,
                    })
                })
                
            }
        })

    }

    const successMessage = () => {
        if(success){
            alert("You are loged in")
        }
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
    const didRedirect = () => {
        if(redirect){
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard" />
            }else{
                return <Redirect to="/user/dashboard" />
            }
        }
    }

    const signinForm = () => {
        return (
        //     <div className="form">
        //         {successMessage()}
        //         {errorMessage()}
        //     <form>
                
        //         <div className="form-items">
        //             <label className="text-light">Email</label><br/>
        //             <input onChange={handleChange("email")} value={email} type="email"/>
        //         </div>
                
        //         <div className="form-items">
        //             <label className="text-light">Password</label><br/>
        //             <input onChange={handleChange("password")} value={password} type="password"/>
        //         </div>
                
        //         <button onClick={onSubmit} className="btn-full btn-center">Signin</button>
                
        //     </form>
        // </div>
        <div className="login">
                <form>
                {errorMessage()}
                {successMessage()}
                    <label>Email</label><br/>
                    <i className="fa fa-envelope"></i>
                    <input type="text" onChange={handleChange("email")} value={email}/><br/>
                    <label>Password</label><br/>
                    <i className="fa fa-key"></i>
                    <input type="password" onChange={handleChange("password")} value={password}/>
                    <button onClick={onSubmit}>Sign In</button>
                </form>
                <p className="account">Don't have account? <Link to="/signup">Sign Up</Link> here</p>
            </div>
        )
    }
    return (
        <Base>
            {signinForm()}
            {didRedirect()}
        </Base>
    )
}


export default Signin;