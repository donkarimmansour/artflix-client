import { FRIENDS_GET_SUCCESS,MESSAGE_GET_SUCCESS,MESSAGE_SEND_SUCCESS,UPDATE_FRIEND_MESSAGE ,SEEN_MESSAGE,DELIVARED_MESSAGE, SOCKET_MESSAGE, SEEN_ALL, UPDATE_FRIEND_STATUS} from "../constans/chat";

const INITIAL_STATE = {
    friends : [],
    message : [],
}

const messengerReducer = (state=INITIAL_STATE , action) =>{
 
    switch(action.type) {
       
        case MESSAGE_GET_SUCCESS : {
            return {
                ...state,
                message : action.payload
            } 
        }

        case MESSAGE_SEND_SUCCESS : {
            return { 
                ...state,
                message : [...state.message,action.payload]
            }
        }

     
        case SOCKET_MESSAGE : {
            return {
                ...state,
                message : [...state.message,action.payload]
            }
         }


        default : {
          return state  
        } 
    }
   
}

export default messengerReducer