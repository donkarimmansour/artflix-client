
import { GET_ORDERS , SET_ORDERS , GET_ORDER } from "../constans/orders"
import { SHOW_ERROR_MESSAGE} from "../constans/message"
import { List, Create } from "../../services/orders"
import { START_LOADING, STOP_LOADING } from "../constans/loading"
import { sendOrder } from "../../telegram/bot"

const get_orders = (filter , authorization) => async dispatch => {

    dispatch({ type: START_LOADING })
    await List( filter , authorization).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: GET_ORDERS,
                payload: data.msg
            })
        } else {
            dispatch({ type: STOP_LOADING })
        }
       //   console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
}


const get_order = (filter , authorization) => async dispatch => {

    dispatch({ type: START_LOADING })
    await List( filter , authorization).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: GET_ORDER,
                payload: data.msg[0]
            })
        } else {
            dispatch({ type: STOP_LOADING })
        }
       //   console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
}


const create_orders = (userId, firstname, lastname, email, phone, address,
    country, city, postcode, state, comment, shipping,
    products, transactionId, transactionState, authorization) => async dispatch => {
        
    dispatch({ type: START_LOADING })

        await Create({
            userId, firstname, lastname, email, phone, address,
            country, city, postcode, state, comment, shipping,
            products, transactionId, transactionState
        }, authorization).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            // dispatch({
            //     type: SET_ORDERS,
            //     payload: data.msg
            // })

            const message = `new order \n
            firstname : ${firstname} \n
            lastname : ${lastname} \n
            email : ${email} \n 
            phone : ${phone} \n
            address : ${address} \n
            country : ${country} \n
            city : ${city} \n
            postcode : ${postcode} \n
            state : ${state} \n
            order : ${data.msg} \n
            comment : ${comment}` ;
            sendOrder(message)

        } else {
            dispatch({ type: STOP_LOADING })
            dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        }
        console.log(data);

    }).catch(err => {
        console.log("set orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
}


export {
    get_orders, create_orders  , get_order
}

