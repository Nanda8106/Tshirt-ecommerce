import React, { Fragment, useEffect, useState } from "react";
import {Link, withRouter} from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";
import {checkCartPresent} from "./helper/CartHelper"

const currentTab = (history, path) => {
    if(history.location.pathname === path){
        return {color: "orange"};
    }else{
        return {color: "white"};
    }
}
const Menu = ({history}) => {
    
    checkCartPresent()
    
    
    return (
        <div className="nav-bar">
           <div className="nav-center">
            <ul>
                <li className="nav-items"><Link style={currentTab(history, "/")} to="/">Home</Link></li>
                {/* TODO: */}
                <li className="nav-items"><Link style={currentTab(history, "/cart")} to="/cart">Cart</Link></li>   
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-items"><Link style={currentTab(history, "/user/dashboard")} to="/user/dashboard">Dashboard</Link></li>
                )}
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-items"><Link style={currentTab(history, "/admin/dashboard")} to="/admin/dashboard">Dahsboard</Link></li>
                )}
                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-items"><Link style={currentTab(history, "/signup")} to="/signup">Signup</Link></li>
                        <li className="nav-items"><Link style={currentTab(history, "/signin")} to="/signin">Signin</Link></li>
                    </Fragment>
                )}
                {isAuthenticated() && (
                    <li className="nav-items"><span onClick={() => {
                        signout( () => {
                            history.push("/")
                        })
                    }}>Signout</span></li>
                )}
            </ul>
            </div>
        </div>
    )
}

export default withRouter(Menu)