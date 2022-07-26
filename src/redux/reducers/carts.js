import { setLocalStorage } from "../../shared/localStorage"
import { GET_CARTS, SET_CARTS, DELETE_CARTS, DECREASE_CARTS, INCREASE_CARTS, COLOR_CARTS , SIZE_CARTS, DELETE_CART, SHIPPING_CARTS } from "../constans/carts"

const INITIAL_STATE = { 
    carts: [] ,
    delete : "" ,
    insert : ""
}

const cartsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CARTS:
            return {
                ...state , 
                carts: action.payload
            }
        case SET_CARTS:
            return {
                carts: action.payload ,
                insert :  Math.random() + new Date() ,
                delete : "" ,
            } 
        case DELETE_CARTS:
            const newCart = state.carts.filter(o => o.product._id !== action.payload.id)
            console.log(newCart);
            setLocalStorage("cart" , newCart)

            return {
                carts: [...newCart] ,
                delete : Math.random() + new Date() ,
                insert : ""
 
            }
        // case DELETE_CART:
        //     return {
        //         carts:[]
        //     }
        case INCREASE_CARTS:
            const indexI = state.carts.findIndex(o => o.product._id == action.payload.id);
            
            if(indexI > -1){
                const shippingIndex = state.carts[indexI].product.shipping.findIndex(s => s.name === state.carts[indexI].shipping)
                const sizeIndex = state.carts[indexI].product.size.findIndex(s => s.name === state.carts[indexI].size)
                const shippingPrice = (shippingIndex !== -1 && state.carts[indexI].product.shipping.length > 0) ? state.carts[indexI].product.shipping[shippingIndex].price : 0
                const sizePrice = (sizeIndex !== -1 && state.carts[indexI].product.size.length > 0) ? state.carts[indexI].product.size[sizeIndex].price : state.carts[indexI].price

                state.carts[indexI]["quantity"] += 1
                state.carts[indexI]["amount"] = (sizePrice * state.carts[indexI]["quantity"]) + (shippingPrice * state.carts[indexI]["quantity"])
            }
         
            setLocalStorage("cart" , state.carts)

            return {
                delete : "" ,
                insert : "" ,
                carts: [...state.carts] 

            }
        case DECREASE_CARTS:
            const indexD = state.carts.findIndex(o => o.product._id == action.payload.id);

            if(indexD > -1){
                if (state.carts[indexD]["quantity"] > 1) {
                    const shippingIndexD = state.carts[indexD].product.shipping.findIndex(s => s.name === state.carts[indexD].shipping)
                    const sizeIndexD = state.carts[indexD].product.size.findIndex(s => s.name === state.carts[indexD].size)
                    const shippingPriceD = (shippingIndexD !== -1 && state.carts[indexD].product.shipping.length > 0) ? state.carts[indexD].product.shipping[shippingIndexD].price : 0
                    const sizePriceD = (sizeIndexD !== -1 && state.carts[indexD].product.size.length > 0) ? state.carts[indexD].product.size[sizeIndexD].price : state.carts[indexD].price
    
                    state.carts[indexD]["quantity"] -= 1
                    state.carts[indexD]["amount"] = (sizePriceD * state.carts[indexD]["quantity"]) + (shippingPriceD* state.carts[indexD]["quantity"])
                }
              
            }


        
                setLocalStorage("cart", state.carts)

            return {
                delete : "" ,
                insert : "" ,
                carts: [...state.carts]
            }

        case COLOR_CARTS:

            return {
                carts: action.payload ,
                delete : "" ,
                insert : ""
            }

        case SIZE_CARTS:

            return {
                carts: action.payload ,
                delete : "" ,
                insert : ""
            }
        case SHIPPING_CARTS:

            return {
                carts: action.payload ,
                delete : "" ,
                insert : ""
            }
        default: return state
    }
}

export default cartsReducer