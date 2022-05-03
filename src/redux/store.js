import { createStore, applyMiddleware , combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import loadingReducer from './reducers/loading';
import ordersReducer from './reducers/orders';
import messageReducer from './reducers/message';
import productsReducer from './reducers/products';
import cartsReducer from './reducers/carts';
import wishlistReducer from './reducers/wishlist';
import mainReducer from './reducers/main';
import subscribeReducer from './reducers/subscribe';
import contactReducer from './reducers/contact';
import catigoriesReducer from './reducers/categories';
import authReducer from './reducers/auth';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 


const middlewares = [thunk]

const reducer = combineReducers({
    loading : loadingReducer ,
    orders : ordersReducer ,
    message : messageReducer ,
    products : productsReducer,
    carts : cartsReducer,
    wishlist : wishlistReducer ,
    main : mainReducer ,
    subscribe : subscribeReducer ,
    contact : contactReducer ,
    catigories : catigoriesReducer ,
    auth : authReducer
})

const persistConfig = { 
    key: 'auth',
    storage,
    whitelist : ["auth"]
}

const persistReducers = persistReducer(persistConfig , reducer)

const initialState = {}

const store = createStore(persistReducers , initialState , composeWithDevTools(applyMiddleware(...middlewares)))
const persist = persistStore(store)

export default store ;
export  {persist} ;