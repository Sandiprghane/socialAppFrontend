//import all redux object to maintained state and props gloabally
//Createtore : object used to create store globally.if we apply create store then we use global state in all our web application
//combineReducers : it is used to combine more than 1 reducers
//applyMiddlewre : it is redux method it is used to maintaining asynchronous functions.
//compose : used to combine more than 1 tools or compose middleware / middleware tools
import {createStore, combineReducers , applyMiddleware , compose} from 'redux'
import thunk from 'redux-thunk'

//import Reducers
import dataReducer from './reducers/dataReducer' // dataReducer is used maintaing state with respect to posts like post info,post manipulations etc
import userReducer from './reducers/userReducer' // userReducer all about user state
import uiReducer from './reducers/uiReducer'     // uiReducer maintaing ui states like loading,set errors etc


const initialState ={} //initial state initialise as empty

const middleware =[thunk]

//combine all three reducers
const reducers = combineReducers({
    user:userReducer,
    data:dataReducer,
    UI:uiReducer
});

//createStore take reducers initial states and middlewares
const store=createStore(
    reducers, 
    initialState, 
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()//it's  redux devtools used to debugging states and it's operation
    )
)

export default store;