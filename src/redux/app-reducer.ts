import {getAuthInfoThunkCreator} from "./auth-reducer.ts";
import {InferActionsTypes} from "./redux-store";

let initialState: InitialStateType = {
    initialized: false
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType) : InitialStateType => {
    switch(action.type){
        case 'SN/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

const actions = {
    initializedSuccess: ()  => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}


export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthInfoThunkCreator());
    Promise.all([promise])
        .then(() => {
        dispatch(actions.initializedSuccess())
    });
}

export default appReducer;