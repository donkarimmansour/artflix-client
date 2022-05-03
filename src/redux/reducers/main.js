import { GET_MAIN } from "../constans/main"

const INITIAL_STATE = {
    main: []
}

const mainReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_MAIN:

            return {
                ...state,
                main: action.payload
            }
        default: return state
    }
}

export default mainReducer