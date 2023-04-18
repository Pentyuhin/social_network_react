import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import messageReducer from "./messageReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import appReducer from "./appReducer";
import chatReducer from "./chat-reducer";


let rootReducer = combineReducers({
    pageProfile: profileReducer,
    pageMessage: messageReducer,
    pageUsers: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
    chat: chatReducer,
})


type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends { [key:string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>



let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


export default store;