import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import {Link} from "react-router-dom";
import { deleteCategory, getCategories } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";


const ManageCategories = () => {
    const [categories, setCategories] = useState([]);

    const {user, token} = isAuthenticated();

    const preload = () => {
        getCategories().then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                setCategories(data)
            }
        })
    }

    const deleteThisCategory = (categoryId) => {
        deleteCategory(categoryId, user._id, token).then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                preload()
            }
        })
    }

    useEffect( () => {
        preload()
    }, [])
    return (
        <Base>
            {/* <div className="bg-dark b-white text-white productform">
                <Link to="/admin/dashboard" className="admin-home"><i className="fa fa-close"></i></Link>
                <h2 className="title text-center text-white l-sm">Manage Categories</h2>
                <h3 className="text-center text-white l-sm">{categories.length} Categories</h3>
                <div className="items-gather">
                {categories.map( (cate, index) => (
                        <div key={index} className="single-item">
                        <div className="col-4">
                            <span className="item-name">{cate.name.length > 25 ? (cate.name.substr(0, 25)+"...") : (cate.name)}</span>
                        </div>
                        <div className="col-4"><Link to={`/admin/category/update/${cate._id}`} className="item-update">Update</Link></div>
                        <div className="col-4"><button onClick={ () => {
                            deleteThisCategory(cate._id)
                        }} className="btn-danger item-delete">Delete</button></div>
                    </div>
                    ))}                   
                </div>
            </div> */}
            <div className="list">
                <Link to="/admin/dashboard"  className="close" ><i className="fa fa-close"></i></Link>
                <h2 className="title text-center l-sm">Manage Categories</h2>
                <h3 className="text-center l-sm">{categories.length} Categories</h3>
                <div className="details">
                        <table width="100%" id="table" style={{textAlign:"center"}}>
                            <tr className="header" height="50px;">
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                            {categories.map( (category, index) => (
                                <tr className="tr" key={index}>
                                    <th>{index+1}</th>
                                    <th title={category.name}>{category.name.length > 20 ? (category.name.substr(0, 20)+"...") : (category.name)}</th>
                                    
                                    <th><Link to={`/admin/category/update/${category._id}`}>Update</Link> |<button onClick={ () => {
                            deleteThisCategory(category._id)
                        }}>Delete</button></th>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>
        </Base>
    )
}

export default ManageCategories;