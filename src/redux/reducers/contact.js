import { SET_CONTACT } from "../constans/contact"

const INITIAL_STATE = {
    contact: {}
}

const contactReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_CONTACT:
            return {
                contact: action.payload
            }
        default: return state
    }
}

export default contactReducer