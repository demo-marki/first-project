import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SHOW_MORE = 'SHOW-MORE';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_IS_FOLLOWING_IN_PROGRESS = 'SET_IS_FOLLOWING_IN_PROGRESS';

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId){
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId){
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_IS_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)

            }
        default:
            return state;
    }
}

export const follow = (userId) => ({type: FOLLOW, userId});
export const unfollow = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})
export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching})
export const setFollowingInProgress = (userId, isFetching) => ({type: SET_IS_FOLLOWING_IN_PROGRESS, userId, isFetching})

export const showMoreAC = (text) => ({
    type: SHOW_MORE,
    newText: text
});

export const getUsersThunkCreator = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        usersAPI.getUsers(currentPage, pageSize).then(response => {
            dispatch(setIsFetching(false));
            dispatch(setUsers(response.items));
            dispatch(setTotalUsersCount(response.totalCount));
        });
    }
}

export const unfollowThunkCreator = (id) => {
    return (dispatch) => {
        dispatch(setFollowingInProgress(id, true));
        usersAPI.unfollow(id).then(response => {
            if (response.resultCode == 0) {
                dispatch(unfollow(id));
            }
            dispatch(setFollowingInProgress(id, false));
        });
    }
}

export const followThunkCreator = (id) => {
    return (dispatch) => {
        dispatch(setFollowingInProgress(id, true));
        usersAPI.follow(id).then(response => {
            if (response.resultCode == 0) {
                dispatch(follow(id));
            }
            dispatch(setFollowingInProgress(id, false));
        });
    }
}

export default usersReducer;