import { GET_CATIGORIES } from "../constans/categories"
import { ListTab } from "../../services/categories"
import { START_LOADING, STOP_LOADING } from "../constans/loading"


const get_catigories = (filter) => async dispatch => {
    dispatch({ type: START_LOADING })

    ListTab(filter).then(({ data }) => {

        if (!data.err) { 
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: GET_CATIGORIES,
                payload: data.msg

            })
        } else {
            dispatch({ type: STOP_LOADING })
           // dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        }
        //  console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
} 


export {
    get_catigories
}

