
import { SET_SUBSCRIBE } from "../constans/subscribe"
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE, CLEAR_MESSAGE } from "../constans/message"
import { Create } from "../../services/subscribe"
import { START_LOADING, STOP_LOADING } from "../constans/loading"

const set_subscribe = (email) => async dispatch => {
    dispatch({ type: START_LOADING })

    Create({email}).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: SET_SUBSCRIBE,
                payload:  data.msg
            })
            dispatch({ type: CLEAR_MESSAGE})
            dispatch({ type: SHOW_SUCCESS_MESSAGE , payload : "sent"})
        } else {
            dispatch({ type: STOP_LOADING })
            dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        }
      //    console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: "something went wrong please try again" })
    })
}

export {
   set_subscribe
}

