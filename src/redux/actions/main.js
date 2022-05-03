
import { GET_MAIN } from "../constans/main"
import { SHOW_ERROR_MESSAGE} from "../constans/message"
import { List } from "../../services/main"
import { START_LOADING, STOP_LOADING } from "../constans/loading"

const get_main = (filter) => async dispatch => {
    dispatch({ type: START_LOADING })

    await List(filter).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: GET_MAIN,
                payload: data.msg
            })
        } else {
            dispatch({ type: STOP_LOADING })
        //    dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        }
         // console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
}


export {
    get_main
}

