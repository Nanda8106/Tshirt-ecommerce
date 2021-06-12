import React from "react";
import Footer from "./Footer";
import Menu from "./Menu";
import "../styles.css";


const Base = ({
    children
}) => {
    return (
        <div className="container">
            <Menu />
            <div>{children}</div>
            <Footer />
        </div>
    )
}

export default Base