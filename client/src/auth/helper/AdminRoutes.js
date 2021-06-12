import React from "react";
import {isAuthenticated} from "./index";
import { Redirect, Route } from "react-router-dom";

const AdminRoutes = ({component : Component, ...rest}) => {
    return (
        <Route
         {...rest}
          render={props =>
             isAuthenticated() && isAuthenticated().user.role === 1 ? 
             (<Component {...props}/>
                ) :( 
                <Redirect to={{
                    pathname:"/signin",
                    state :{from:props.location}
                    }}
                />
            )}
        />
    )
}

export default AdminRoutes;