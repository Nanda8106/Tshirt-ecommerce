export const addItemToCart = (item,quantity,size, next) => {
    let cart = [];
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        cart.push({
            ...item,
            quantity:quantity,
            size: size
        })
        localStorage.setItem("cart", JSON.stringify(cart))
        next();
    }
}

export const checkCartPresent = () => {
    if(typeof window !== undefined){
        if(!localStorage.getItem("cart")){
            console.log("there is no cart")
            let cart=[];
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }
}



export const removeItemFromCart = productId => {
    let cart = [];
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        cart.map( (product , index) => {
            if(product._id === productId){
                cart.splice(index, 1);
            }
        })
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    return cart;
}

export const loadCart = () => {
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
}

export const updateProductInCart = (productId, item, quantity) => {
    let cart = [];
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        cart.map( (product , index) => {
            if(product._id === productId){
                cart.splice(index, 1, {...item, quantity:quantity});
            }
        })
        localStorage.setItem("cart" , JSON.stringify(cart))

    }
}

export const getProductQuantyInCart = (productId, next) => {
    let cart = [];
    let quantity =0;
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        cart.map( (product , index) => {
            if(product._id === productId){
                quantity = product.quantity;

            }
        })
    }
    return quantity;
}


export const makeCartEmpty = next => {
    if(typeof window !== undefined){
        localStorage.removeItem("cart");
        let cart=[];
        localStorage.setItem("cart", JSON.stringify(cart));
        next();
    }
}