import axios from "axios"
import {Host , ApiEndpoints} from "../common/apiEndPoints"

const config = {
    headers : {
       "Content-Type" : "application/json" 
    }  
}


const List = async (filter) => {
    return  await  axios.get(`${Host.BACKEND}${ApiEndpoints.MainEndpoints.route}${ApiEndpoints.MainEndpoints.list}` 
    , { headers :  {...config.headers} , params : {...filter} } )
}

export {
  List
}