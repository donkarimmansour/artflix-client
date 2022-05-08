
import { SET_CONTACT } from "../constans/contact"
import { SHOW_ERROR_MESSAGE, CLEAR_MESSAGE, SHOW_SUCCESS_MESSAGE } from "../constans/message"
import { Create } from "../../services/contact"
import { START_LOADING, STOP_LOADING } from "../constans/loading"
import { sendContact } from "../../telegram/bot"

const set_contact = (firstname , lastname , email , phone , comment) => async dispatch => {
    dispatch({ type: START_LOADING })

    Create({firstname , lastname , email , phone , comment}).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: SET_CONTACT,
                payload:  data.msg
            })
            dispatch({ type: CLEAR_MESSAGE})
            dispatch({ type: SHOW_SUCCESS_MESSAGE , payload : "sentc"})

            
           const message = `new contact \n
           firstname : ${firstname} \n
           lastname : ${lastname} \n
           email : ${email} \n 
           phone : ${phone} \n
           comment : ${comment}` ;
           sendContact(message)

        } else {
            dispatch({ type: STOP_LOADING })
            dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg[0] })
        } 
       //   console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: "something went wrong please try again" })
    })
}

export {
   set_contact
}

