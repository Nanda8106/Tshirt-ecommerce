import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import AdminRoutes from "./auth/helper/AdminRoutes";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import AdminDashBoard from "./user/AdminDashBoard";
import UserDashBoard from "./user/UserDashBoard";
import SignRoutes from "./auth/helper/SignRoutes";
import AddProduct from "./admin/AddProduct";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import ManageProducts from "./admin/ManageProducts";
import ManageOrders from "./admin/ManageOrders";
import UpdateProduct from "./admin/UpdateProducts";
import UpdateCategory from "./admin/UpdateCategories";
import Cart from "./core/Cart";
import PaymentB from "./core/PaymentB";
import UserOrders from "./user/UserOrders";
import ProductDetails from "./core/ProductDetails";
import WishList from "./user/WishList";
import UserSettings from "./user/UserSettings";


const Routes = ()=> {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/cart" component={Cart}/>
                <Route exact path="/product/:productId" component={ProductDetails}/>
                <SignRoutes exact path="/signup" component={Signup} /> 
                <SignRoutes exact path="/signin" component={Signin} /> 
                <AdminRoutes exact path="/admin/dashboard" component={AdminDashBoard} />
                <AdminRoutes exact path="/admin/create/product" component={AddProduct} />
                <AdminRoutes exact path="/admin/create/category" component={AddCategory} />
                <AdminRoutes exact path="/admin/categories" component={ManageCategories} />
                <AdminRoutes exact path="/admin/products" component={ManageProducts} />
                <AdminRoutes exact path="/admin/orders" component={ManageOrders} />
                <AdminRoutes exact path="/admin/product/update/:productId" component={UpdateProduct} />
                <AdminRoutes exact path="/admin/category/update/:categoryId" component={UpdateCategory} />
                <PrivateRoutes exact path="/user/dashboard" component={UserDashBoard}/>
                <PrivateRoutes exact path="/user/payment/braintree" component={PaymentB}/>
                <PrivateRoutes exact path="/user/orders" component={UserOrders}/>
                <PrivateRoutes exact path="/user/whislist" component={WishList}/>
                <PrivateRoutes exact path="/user/settings" component={UserSettings}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes