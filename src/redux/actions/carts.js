
import { GET_CARTS , SET_CARTS , DELETE_CARTS , DECREASE_CARTS , INCREASE_CARTS  , COLOR_CARTS , SIZE_CARTS, SHIPPING_CARTS } from "../constans/carts"
import { SHOW_ERROR_MESSAGE } from "../constans/message"
import { START_LOADING, STOP_LOADING } from "../constans/loading"
import { getLocalStorage, setLocalStorage } from "../../shared/localStorage"


const get_carts = () => async dispatch => {
    dispatch({ type: START_LOADING })

    try {
        const cart = localStorage.getItem("cart") ?  getLocalStorage("cart") : [] 
         
        dispatch({
            type: GET_CARTS,
            payload: cart
        })
    
        dispatch({ type: STOP_LOADING })
    }catch(err){
        console.log("set carts api err ", err);
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err })
        dispatch({ type: STOP_LOADING })
    }

   

}

const create_carts = (product) => async dispatch => {
    dispatch({ type: START_LOADING })

    try { 

        const cart =  localStorage.getItem("cart") ? getLocalStorage("cart") : [] 
        const index = cart.findIndex(c => c.product._id === product._id)


         
        if(index > -1){
            const shippingIndex = product.shipping.findIndex(s => s.name ===cart[index].shipping)
            const sizeIndex = product.size.findIndex(s => s.name === cart[index].size)
            const shippingPrice = (shippingIndex !== -1 && product.shipping.length > 0) ? product.shipping[shippingIndex].price : 0
            const sizePrice = (sizeIndex !== -1 && product.size.length > 0) ? product.size[sizeIndex].price : product.price

             cart[index].quantity += 1
             cart[index].color = product.color[0]
            //  cart[index].size = (product.size.length > 0) ? product.size[index].size : "Standard"
            //  cart[index].shipping = (product.shipping.length > 0) ? product.shipping[index].name : "Standard"
             cart[index].amount = (sizePrice * cart[index].quantity) + (shippingPrice * cart[index].quantity) 
        }else {
            const shippingName = (product.shipping.length > 0) ? product.shipping[0].name : "Standard"
            const sizeName = (product.size.length > 0) ? product.size[0].size : "Standard"
            const shippingPrice = (product.shipping.length > 0) ? product.shipping[0].price : 0
            const sizePrice = (product.size.length > 0) ? product.size[0].price : product.price

             cart.push({
                product ,
                quantity : 1 ,
                shipping : shippingName ,
                size : sizeName ,
                color : product.color[0] ,
                amount : (sizePrice + shippingPrice) ,
                price : sizePrice })
        }

        dispatch({
            type: SET_CARTS, 
            payload: cart
        })

        setLocalStorage("cart" , cart)

        dispatch({ type: STOP_LOADING })
    }catch(err){
        console.log("set carts api err ", err);
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err })
        dispatch({ type: STOP_LOADING })
    }

}

const increase_carts = (id) => async dispatch => {
    dispatch({ type: START_LOADING })

    try {

        dispatch({
            type: INCREASE_CARTS,
            payload: {id}
        })
    
        dispatch({ type: STOP_LOADING })
    }catch(err){
        console.log("set carts api err ", err);
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err })
        dispatch({ type: STOP_LOADING })
    }

   

}

const decrease_carts = (id) => async dispatch => {
    dispatch({ type: START_LOADING })

    try {

    
        dispatch({
            type: DECREASE_CARTS,
            payload: {id}
        })
    
        dispatch({ type: STOP_LOADING })
    }catch(err){
        console.log("set carts api err ", err);
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err })
        dispatch({ type: STOP_LOADING })
    }

   

}



const delete_carts = (id) => async dispatch => {
    dispatch({ type: START_LOADING })

    try {

        dispatch({
            type: DELETE_CARTS,
            payload: {id}
        })
    
        dispatch({ type: STOP_LOADING })
    }catch(err){
        console.log("set carts api err ", err);
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err })
        dispatch({ type: STOP_LOADING })
    }
}


const size_carts = (id , size , price) => async dispatch => {
    dispatch({ type: START_LOADING })

    try {

        const cart =  localStorage.getItem("cart") ? getLocalStorage("cart") : [] 
        const index = cart.findIndex(c => c.product._id === id)
    
    
           
        if(index > -1){
            const sizeIndex = cart[index].product.size.findIndex(s => s.size === size)
            const sizePrice = (sizeIndex !== -1 && cart[index].product.size.length > 0) ? cart[index].product.size[sizeIndex].price : cart[index].price
            const sizeName = (sizeIndex !== -1 && cart[index].product.size.length > 0) ? cart[index].product.size[sizeIndex].size : cart[index].size
            const shippingIndex = cart[index].product.shipping.findIndex(s => s.name === cart[index].shipping)
            const shippingPrice = (shippingIndex !== -1 && cart[index].product.shipping.length > 0) ? cart[index].product.shipping[shippingIndex].price : 0
          //  const shippingName = (shippingIndex !== -1 && cart[index].product.shipping.length > 0) ? cart[index].product.shipping[shippingIndex].name : cart[index].shipping
          
             cart[index].size = sizeName
             cart[index].price = sizePrice
             cart[index].amount = (sizePrice * cart[index].quantity) + (shippingPrice * cart[index].quantity)

        }
        
        dispatch({
            type: SIZE_CARTS,
            payload: cart
        })
        setLocalStorage("cart" , cart)

        dispatch({ type: STOP_LOADING })
    }catch(err){
        console.log("set carts api err ", err);
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err })
        dispatch({ type: STOP_LOADING })
    }
}


const shipping_carts = (id , shipping) => async dispatch => {
    dispatch({ type: START_LOADING })

    try {

        const cart =  localStorage.getItem("cart") ? getLocalStorage("cart") : [] 
        const index = cart.findIndex(c => c.product._id === id)

              
        if (index > -1) {
            const sizeIndex = cart[index].product.size.findIndex(s => s.name === cart[index].size)
            const sizePrice = (sizeIndex !== -1 && cart[index].product.size.length > 0) ? cart[index].product.size[sizeIndex].price : cart[index].price
            // const sizeName = (sizeIndex !== -1 && cart[index].product.size.length > 0) ? cart[index].product.size[sizeIndex].name : cart[index].size
            const shippingIndex = cart[index].product.shipping.findIndex(s => s.name === shipping.name)
            const shippingPrice = (shippingIndex !== -1 && cart[index].product.shipping.length > 0) ? cart[index].product.shipping[shippingIndex].price : 0
            const shippingName = (shippingIndex !== -1 && cart[index].product.shipping.length > 0) ? cart[index].product.shipping[shippingIndex].name : cart[index].shipping

            cart[index].shipping = shippingName
            cart[index].amount = (sizePrice * cart[index].quantity) + (shippingPrice * cart[index].quantity)
        }

        dispatch({
            type: SHIPPING_CARTS,
            payload: cart
        })
        setLocalStorage("cart" , cart)

        dispatch({ type: STOP_LOADING })
    }catch(err){
        console.log("set carts api err ", err);
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err })
        dispatch({ type: STOP_LOADING })
    }
}



const color_carts = (id , color) => async dispatch => {
    dispatch({ type: START_LOADING })

    try {

        const cart =  localStorage.getItem("cart") ? getLocalStorage("cart") : [] 
        const index = cart.findIndex(c => c.product._id === id)
    
    
        if(index => 0){
             cart[index].color = color
        }
    
        dispatch({
            type: COLOR_CARTS,
            payload: cart
        })
        setLocalStorage("cart" , cart)

        dispatch({ type: STOP_LOADING })
    }catch(err){
        console.log("set carts api err ", err);
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err })
        dispatch({ type: STOP_LOADING })
    }
}



export {
    get_carts, create_carts , increase_carts , decrease_carts , color_carts , size_carts , delete_carts , shipping_carts
}

