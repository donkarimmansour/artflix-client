import { GET_WISHLIST, CREATE_WISHLIST, DELETE_WISHLIST, COUNT_WISHLIST } from "../constans/wishlist"

const INITIAL_STATE = {
    wishlist: [], 
    count: 0 ,
    delete : "" ,
    insert : ""
}

const wishlistReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_WISHLIST:
            return {
                ...state,
                wishlist: action.payload
            }
        case CREATE_WISHLIST:

            return {
                wishlist: [...state.wishlist, action.payload] ,
                count : state.wishlist.length != (state.wishlist.length + 1) ? state.count + 1 : state.count ,
                insert : Math.random() + new Date() ,
                delete : "" ,

            }
        case DELETE_WISHLIST:

            const newishlist = state.wishlist.filter(w => w._id !== action.payload.id)
            return {
                wishlist: [...newishlist] ,
                count : state.wishlist.length != newishlist.length ? state.count - 1 : state.count ,
                delete : Math.random() + new Date() ,
                insert : ""

            }

        case COUNT_WISHLIST:

        return {
                ...state,
                count: action.payload
            }
        default: return state
    }
}

export default wishlistReducer