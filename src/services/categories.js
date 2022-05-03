import axios from "axios"
import {Host , ApiEndpoints} from "../common/apiEndPoints"

const config = {
    headers : {
       "Content-Type" : "application/json" 
    }  
}


const List = async (filter) => {
    return  await  axios.get(`${Host.BACKEND}${ApiEndpoints.CatyEndpoints.route}${ApiEndpoints.CatyEndpoints.list}` 
    , { headers :  {...config.headers} , params : {...filter} } )
}

const ListTab = async (filter) => {
  return  await  axios.get(`${Host.BACKEND}${ApiEndpoints.CatyEndpoints.route}${ApiEndpoints.CatyEndpoints.listtab}` 
  , { headers :  {...config.headers} , params : {...filter} } )
}

export {
  List ,
  ListTab
}