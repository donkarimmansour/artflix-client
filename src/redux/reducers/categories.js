import {GET_CATIGORIES} from "../constans/categories"

const INITIAL_STATE = {
    catigories: {}
}

const catigoriesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_CATIGORIES:
            return {
                catigories: action.payload
            }
       
        default: return state
    }
}

export default catigoriesReducer