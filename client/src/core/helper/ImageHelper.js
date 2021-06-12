import { API } from "../../backend";
import React from "react";

const ImageHelper = ({
    product,
    width,
    height
}) => {
    const imageUrl = `${API}/product/photo/${product._id}`;
    return (
        <img src={imageUrl} width={width} height={height} alt="photo"/>
    )
}

export default ImageHelper;