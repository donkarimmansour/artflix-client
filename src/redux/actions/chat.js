import { seenMessageApi  ,getMessageApi  ,delivaredMessageApi  ,ImageMessageSendApi , messageSendApi } from '../../services/chat';
import { START_LOADING, STOP_LOADING } from '../constans/loading';
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE } from '../constans/message';
import { MESSAGE_GET_SUCCESS,MESSAGE_SEND_SUCCESS } from "../constans/chat";




 const getMessage = (p , id) => async dispatch => {
 
    dispatch({ type: START_LOADING }) 

    getMessageApi(p , id).then(({ data }) => {

        if (data.msg === "there are no Messages" || !data.err ) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type : MESSAGE_GET_SUCCESS,
                payload : data.msg === "there are no Messages" ? [] : data.msg
            })
            dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: "getMessage" })

        } else {
            dispatch({ type: STOP_LOADING })
        }
        //  console.log("data");

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
    
}


const messageSend = (data , type) => async dispatch => {

    dispatch({ type: START_LOADING })

    messageSendApi(data).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type : MESSAGE_SEND_SUCCESS,
                payload : data.msg
            })

            if(type === "first") dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: "MessageSendFIRST" })
            else dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: "MessageSend" })

        } else {
            dispatch({ type: STOP_LOADING })
        }
        //  console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
    
}


 const ImageMessageSend = (myData) => async dispatch => {
     console.log(   myData);

    dispatch({ type: START_LOADING }) 

    ImageMessageSendApi(myData).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type : MESSAGE_SEND_SUCCESS,
                payload :  data.msg
            })
            dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: "MessageSend" })

        } else {
            dispatch({ type: STOP_LOADING })
            dispatch({ type: SHOW_ERROR_MESSAGE, payload: "somthing went wrong please trey again" })

        }
      //    console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
    
}


 const seenMessage = (msg) => async dispatch => {

    dispatch({ type: START_LOADING })

    seenMessageApi(msg).then(({ data }) => {

        // if (!data.err) {
             dispatch({ type: STOP_LOADING })
          
        // } else {
        //     dispatch({ type: STOP_LOADING })
        //    // dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        // }
      //    console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
    
}


 const delivaredMessage = (msg) => async dispatch => {

    dispatch({ type: START_LOADING })

    delivaredMessageApi(msg).then(({ data }) => {

        // if (!data.err) {
             dispatch({ type: STOP_LOADING })
          
        // } else {
        //     dispatch({ type: STOP_LOADING })
        //    // dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        // }
      //    console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
    
}




export { seenMessage  , getMessage , delivaredMessage , ImageMessageSend , messageSend }

