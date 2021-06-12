import React from "react";
import {Link} from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const AdminDashBoard = () => {
    const {user} = isAuthenticated();
    const adminLeftSide = () => {
        return (
            <div className="admin-left-side">
                <h4 className="admin-header">Admin Navigation</h4>
                <ul className="list-group">
                    <li className="admin-list-item">
                        <Link to="/admin/create/category" className="nav-list text-success">Create Category</Link>
                    </li>
                    <li className="admin-list-item">
                        <Link to="/admin/create/product" className="nav-list text-success">Create Product</Link>
                    </li>
                    <li className="admin-list-item">
                        <Link to="/admin/categories" className="nav-list text-success">Manage Categories</Link>
                    </li>
                    
                    <li className="admin-list-item">
                        <Link to="/admin/products" className="nav-list text-success">Manage Products</Link>
                    </li>
                    <li className="admin-list-item">
                        <Link to="/admin/orders" className="nav-list text-success">Manage Orders</Link>
                    </li>
                    <li className="admin-list-item">
                        <Link to="/user/orders" className="nav-list text-success">Your Order History</Link>
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

    const adminRightSide = () => {
        return (
            <div className="admin-right-side">
                
                <div className="admin-details">
                    <h4 className="admin-header">Admin Information</h4>
                    <ul className="list-group">
                        <li className="admin-list-item">
                            <span className="badge bg-dark mr-2">Name:</span>{user.name}
                        </li>
                        <li className="admin-list-item">
                            <span className="badge bg-dark mr-2">Email:</span>{user.email}
                        </li>
                        <li className="list-group-item">
                            <span className="badge bg-danger">Admin Area</span>
                        </li>
                        
                    </ul>
                </div> 
                
            </div>
        )
    }
    return (
        <Base>
            <div className="admin-dashboard">
                {adminLeftSide()}
                {adminRightSide()}
            </div>
        </Base>
    )
}


export default AdminDashBoard;