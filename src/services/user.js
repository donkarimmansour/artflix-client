import axios from "axios"
import {Host , ApiEndpoints} from "../common/apiEndPoints"

const config = {
    headers : {
       "Content-Type" : "application/json" 
    }  
}

const EditAccount = async (id , data , con) => {
    return  await  axios.put(`${Host.BACKEND}${ApiEndpoints.AuthEndpoints.route}${ApiEndpoints.AuthEndpoints.edit}/${id}`, data , { headers : {...config.headers , ...con} } )
}

const AddressAccount = async (id , data , con) => {
    return  await  axios.put(`${Host.BACKEND}${ApiEndpoints.AuthEndpoints.route}${ApiEndpoints.AuthEndpoints.address}/${id}`, data , { headers : {...config.headers , ...con} } )
}


const List = async (filiter) => {
    return  await  axios.get(`${Host.BACKEND}${ApiEndpoints.AuthEndpoints.route}${ApiEndpoints.AuthEndpoints.list}`, filiter , config)
}

const Image = async (id , data , con) => {
    return  await  axios.put(`${Host.BACKEND}${ApiEndpoints.AuthEndpoints.route}${ApiEndpoints.AuthEndpoints.image}/${id}`, data , { headers : {...config.headers , ...con} } )
}


export {
    EditAccount , AddressAccount , List , Image
}