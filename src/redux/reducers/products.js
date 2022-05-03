import {
    GET_PRODUCTS, GET_SINGLE_PRODUCTS, GET_TABS_PRODUCTS, SET_PRODUCT_ID, GET_PRODUCTS_FILTER, GET_CATYONE, GET_CATYTWO,
    GET_SIZES, GET_COLORS, GET_COUNT, GET_FEATURE_PRODUCTS, GET_LIMITED_PRODUCTS,
    GET_EXTRA_PRODUCTS, GET_RANDOM_PRODUCT
} from "../constans/products"

const INITIAL_STATE = {
    products: [],
    singleproduct: {},
    tabsproducts: [],
    productid: "",
    catyone: [],
    catytwo: [],
    filters: [],
    sizes: [],
    colors: [],
    count: 0,
    featureproducts: [],
    limitedproducts: [],
    extraproducts: [],
    randomproduct: {},
}

const productsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            state.products[action.payload.name] = action.payload.products
            return {
                ...state,
                products: state.products
            }
        case GET_TABS_PRODUCTS:
            return {
                ...state,
                tabsproducts: action.payload
            }

        case GET_SINGLE_PRODUCTS:
            return {
                ...state,
                singleproduct: action.payload
            }

        case SET_PRODUCT_ID:
            return {
                ...state,
                productid: action.payload.id
            }
        case GET_CATYONE:
            state.catyone[action.payload.name] = action.payload.products

            return {
                ...state,
                catyone: state.catyone
            }
        case GET_CATYTWO:
            state.catytwo[action.payload.name] = action.payload.products
            return {
                ...state,
                catytwo: state.catytwo
            }
        case GET_PRODUCTS_FILTER:
            return {
                ...state,
                filters: action.payload
            }

        case GET_COUNT:
            return {
                ...state,
                count: action.payload
            }

        case GET_SIZES:
            return {
                ...state,
                sizes: action.payload
            }

        case GET_COLORS:
            return {
                ...state,
                colors: action.payload
            }

        case GET_EXTRA_PRODUCTS:
            return {
                ...state,
                extraproducts: action.payload
            }
        case GET_FEATURE_PRODUCTS:
            return {
                ...state,
                featureproducts: action.payload
            }
        case GET_LIMITED_PRODUCTS:
            return {
                ...state,
                limitedproducts: action.payload
            }
        case GET_RANDOM_PRODUCT:
            return {
                ...state,
                randomproduct: action.payload[0]
            }
        default: return state
    }
}

export default productsReducer