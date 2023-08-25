import {InferActionsTypes} from "./redux-store";

let initialState = {

}
type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
//type ThunkType = BaseThunkType<ActionsType>

const sidebarReducer = (state = initialState, action: ActionsType): InitialStateType => {
    return state;
}

export const actions = {

}

export default sidebarReducer;