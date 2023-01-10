import {combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import messageReducer from "./messageReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";


let reducers= combineReducers({
    pageProfile: profileReducer,
    pageMessage: messageReducer,
    pageUsers: usersReducer,
    auth: authReducer
})


let store = createStore(reducers);


export default store;