import {Action, AnyAction, applyMiddleware, combineReducers, compose, legacy_createStore} from "redux"
import profileReducer from "./profile-reducer.ts";
import sidebarReducer from "./sidebar-reducer.ts";
import dialogsReducer from "./dialogs-reducer.ts";
import usersReducer from "./users-reducer.ts";
import authReducer from "./auth-reducer.ts";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import appReducer from "./app-reducer.ts";
import {useDispatch} from "react-redux";

let rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
});

type RootReducerType = typeof  rootReducers
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

//export type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>
//export const useTypedDispatch = useDispatch<TypedDispatch>()
//export type TypedDispatch = ThunkDispatch<AppStateType, any, Action>

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(rootReducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

//let store = legacy_createStore(rootReducers, applyMiddleware(thunkMiddleware));

export default store;
window.store = store;