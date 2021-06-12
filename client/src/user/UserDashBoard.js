import React from "react";
import Base from "../core/Base";
import {Link} from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

const UserDashBoard = () => {

    const {user} = isAuthenticated();
    const userLeftSide = () => {
        return (
            <div className="user-left-side">
                <h4 className="admin-header">User Navigation</h4>
                <ul className="list-group">
                    <li className="admin-list-item">
                        <Link to="/user/orders" className="nav-list text-success">Order History</Link>
                    </li>
                    <li className="admin-list-item">
                        <Link to="/user/whislist" className="nav-list text-success">Wish List</Link>
                    </li>
                    <li className="admin-list-item">
                        <Link to="/user/settings" className="nav-list text-success">Settings</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const userRightSide = () => {
        return (
            <div className="admin-right-side">
                
                <div className="admin-details">
                    <h4 className="admin-header">User Information</h4>
                    <ul className="list-group">
                        <li className="admin-list-item">
                            <span className="badge bg-dark mr-2">Name:</span>{user.name}
                        </li>
                        <li className="admin-list-item">
                            <span className="badge bg-dark mr-2">Email:</span>{user.email}
                        </li>
                        <li className="list-group-item">
                            <span className="badge bg-danger">User Dahsboard Area</span>
                        </li>
                        
                    </ul>
                </div> 
                
            </div>
        )
    }
    return (
        <Base>
            <div className="admin-dashboard">
                {userLeftSide()}
                {userRightSide()}
            </div>
        </Base>
    )
}


export default UserDashBoard;