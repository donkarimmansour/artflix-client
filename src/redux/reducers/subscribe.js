import { SET_SUBSCRIBE } from "../constans/subscribe"

const INITIAL_STATE = {
    subscribe: {}
}

const subscribeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_SUBSCRIBE:
            return {
                subscribe: action.payload
            }
        default: return state
    }
}

export default subscribeReducer