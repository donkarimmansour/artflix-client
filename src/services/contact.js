import axios from "axios"
import {Host , ApiEndpoints} from "../common/apiEndPoints"

const config = {
    headers : {
       "Content-Type" : "application/json" 
    }  
}

const Create = async (data ) => {
  return  await  axios.post(`${Host.BACKEND}${ApiEndpoints.ContactEndpoints.route}${ApiEndpoints.ContactEndpoints.create}` 
  , data , { headers :  {...config.headers } })
} 


export {
 Create
}