import {Action, applyMiddleware, combineReducers, compose, legacy_createStore} from "redux"
import profileReducer from "./profile-reducer.ts";
import sidebarReducer from "./sidebar-reducer.ts";
import dialogsReducer from "./dialogs-reducer.ts";
import usersReducer from "./users-reducer.ts";
import authReducer from "./auth-reducer.ts";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import appReducer from "./app-reducer.ts";

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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(rootReducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

//let store = legacy_createStore(rootReducers, applyMiddleware(thunkMiddleware));

export default store;
window.store = store;