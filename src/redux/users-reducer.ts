import {updateObjectInArray} from "../utils/object-helpers.ts";
import {UserType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/users-api.ts";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> //array of users id
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case 'SN/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case 'SN/USERS/SET_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'SN/USERS/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'SN/USERS/SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case 'SN/USERS/SET_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'SN/USERS/SET_IS_FOLLOWING_IN_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)

            }
        default:
            return state;
    }
}

export const actions = {
    follow: (userId: number) => ({type: 'SN/USERS/FOLLOW', userId} as const),
    unfollow: (userId: number) => ({type: 'SN/USERS/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SN/USERS/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SN/USERS/SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: 'SN/USERS/SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
    setIsFetching: (isFetching: boolean) => ({
        type: 'SN/USERS/SET_IS_FETCHING', isFetching} as const),
    setFollowingInProgress: (userId: number, isFetching: boolean) => ({
        type: 'SN/USERS/SET_IS_FOLLOWING_IN_PROGRESS', userId, isFetching} as const),
    showMoreAC: (text: string) => ({type: 'SN/USERS/SHOW_MORE', newText: text} as const)
}

export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkType =>
    async (dispatch) => {
    dispatch(actions.setIsFetching(true));
    dispatch(actions.setCurrentPage(currentPage));

    let response = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(actions.setIsFetching(false));
    dispatch(actions.setUsers(response.items));
    dispatch(actions.setTotalUsersCount(response.totalCount));
}

const followUnfollowFlow = async(dispatch: Dispatch<ActionsType>, id: number,
                                 apiMethod, actionCreator: (id: number) => ActionsType) => {
    dispatch(actions.setFollowingInProgress(id, true));

    let response = await apiMethod(id);

    if (response.resultCode === 0) {
        dispatch(actionCreator(id));
    }
    dispatch(actions.setFollowingInProgress(id, false));
}

export const unfollowThunkCreator = (id: number): ThunkType => async (dispatch) => {
    await followUnfollowFlow(dispatch, id, usersAPI.unfollow.bind(usersAPI), actions.unfollow);
}

export const followThunkCreator = (id: number): ThunkType => async (dispatch) => {
    await followUnfollowFlow(dispatch, id, usersAPI.follow.bind(usersAPI), actions.follow);

}

export default usersReducer;