import {AppStateType} from "./redux-store";

export const getUsers = (state: AppStateType) => {
    return state.usersPage.users;
}

export const getPageSize = (state: AppStateType): number => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: AppStateType): number => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: AppStateType): number => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state: AppStateType): boolean => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
}

export const  getUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter
}



