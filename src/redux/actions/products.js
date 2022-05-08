
import { GET_PRODUCTS , GET_SINGLE_PRODUCTS , GET_TABS_PRODUCTS  , SET_PRODUCT_ID , GET_PRODUCTS_FILTER , GET_CATYONE , GET_CATYTWO 
, GET_SIZES , GET_COLORS , GET_COUNT  , GET_FEATURE_PRODUCTS , GET_LIMITED_PRODUCTS ,
 GET_EXTRA_PRODUCTS  , GET_RANDOM_PRODUCT  } from "../constans/products"

import { SHOW_ERROR_MESSAGE} from "../constans/message"
import { List , ListTab , ListDistinct , ListCount, Views} from "../../services/products"
import { START_LOADING, STOP_LOADING } from "../constans/loading"

const get_products = (filter) => async dispatch => {
    dispatch({ type: START_LOADING })

    List(filter).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: GET_PRODUCTS,
                payload: { name : filter.catyName , products : data.msg}
            })
        } else {
            dispatch({ type: STOP_LOADING })
           // dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        }
      //    console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
}


const get_products_tab = (filter) => async dispatch => {
    dispatch({ type: START_LOADING })

    ListTab(filter).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: GET_TABS_PRODUCTS,
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



const get_single_product = (filter) => async dispatch => {
  
    dispatch({ type: START_LOADING })
    
    List(filter).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: GET_SINGLE_PRODUCTS,
                payload: data.msg[0]

            })
        } else {
            dispatch({ type: STOP_LOADING })
           // dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        }
         // console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
}



const set_product_id = (id) => async dispatch => {
    dispatch({ type: START_LOADING })

    try{
            
            dispatch({
                type: SET_PRODUCT_ID,
                payload: {id}
            })
        
            dispatch({ type: STOP_LOADING })

    }catch(err){
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err })
    }
}

const get_catyone = (filter) => async dispatch => {
    dispatch({ type: START_LOADING })

    List(filter).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: GET_CATYONE,
                payload: { name : filter.catyName , products : data.msg}

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



const get_catytwo = (filter) => async dispatch => {
    dispatch({ type: START_LOADING })

    List(filter).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: GET_CATYTWO,
                payload: { name : filter.catyName , products : data.msg}

            })
        } else {
            dispatch({ type: STOP_LOADING })
           // dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        }
         // console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
}


const get_filter = (filter) => async dispatch => {
    dispatch({ type: START_LOADING })

    List(filter).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: GET_PRODUCTS_FILTER,
                payload: data.msg

            })
        } else {
            dispatch({
                type: GET_PRODUCTS_FILTER,
                payload: []

            })
            dispatch({ type: STOP_LOADING })
           // dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        }
        //  console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
}


const get_count = (filter) => async dispatch => {
    dispatch({ type: START_LOADING })

    ListCount(filter).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: GET_COUNT,
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


const get_colors = (filter) => async dispatch => {
    dispatch({ type: START_LOADING })

    ListDistinct(filter).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: GET_COLORS,
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



const get_sizes = (filter) => async dispatch => {
    dispatch({ type: START_LOADING })

    ListDistinct(filter).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: GET_SIZES,
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




const get_extra_products = (filter) => async dispatch => {
    dispatch({ type: START_LOADING })

    List(filter).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: GET_EXTRA_PRODUCTS,
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



const get_feature_products = (filter) => async dispatch => {
    dispatch({ type: START_LOADING })

    List(filter).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: GET_FEATURE_PRODUCTS,
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


const get_limited_products = (filter) => async dispatch => {
    dispatch({ type: START_LOADING })

    List(filter).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: GET_LIMITED_PRODUCTS,
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


const get_random_product = (filter) => async dispatch => {
    dispatch({ type: START_LOADING })

    List(filter).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: GET_RANDOM_PRODUCT,
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

const set_Views = (id , type) => async dispatch => {
    dispatch({ type: START_LOADING })

    Views(id , {type}).then(({ data }) => {

     dispatch({ type: STOP_LOADING })

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
}

export {
    get_products , get_products_tab , get_single_product  , set_product_id , get_filter ,
    get_catyone , get_catytwo , get_colors , get_sizes , get_count  ,
    get_feature_products , get_limited_products , get_extra_products , get_random_product , set_Views
}

