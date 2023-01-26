import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import messageReducer from "./messageReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./appReducer";


let reducers= combineReducers({
    pageProfile: profileReducer,
    pageMessage: messageReducer,
    pageUsers: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
})


let store = createStore(reducers, applyMiddleware(thunkMiddleware));


export default store;