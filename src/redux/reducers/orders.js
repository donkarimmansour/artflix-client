import { GET_ORDERS, GET_ORDER} from "../constans/orders"

const INITIAL_STATE = {
    orders: [] ,
    order : {}
}

const ordersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state ,
                orders: action.payload
            }
        case GET_ORDER:
            return {
                ...state ,
                order: action.payload
            }
        default: return state
    }
}

export default ordersReducer