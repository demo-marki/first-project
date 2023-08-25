import {PhotosType, PostType, ProfileType} from "../types/types";
import {profileAPI} from "../api/profile-api.ts";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

let initialState = {
    posts: [
        {id: 1, message: 'Hi!', likesCount: 0},
        {id: 2, message: 'Стена ВКонтакте: что это за зверь и как с ним работать?', likesCount: 12},
        {id: 3, message: 'Как писать на своей стене?', likesCount: 23},
        {id: 4, message: 'Как писать на стене друга или другого пользователя?', likesCount: 5},
        {id: 5, message: 'Что такое стена в ВК?', likesCount: 7}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ""
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD-POST':
            let newPost = {
                id: 5,
                message: action.text,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        case 'SN/PROFILE/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile

            };
        case 'SN/PROFILE/SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'SN/PROFILE/DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)

            }
        case 'SN/PROFILE/SET_AVATAR':
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        default:
            return state;
    }
}

export const actions = {
    addPostActionCreator: (text: string) => ({type: 'SN/PROFILE/ADD-POST', text} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
    setUserStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
    deletePost: (postId: number) => ({type: 'SN/PROFILE/DELETE_POST', postId} as const),
    saveAvatarSuccess: (photos: PhotosType)=> ({type: 'SN/PROFILE/SET_AVATAR', photos} as const)
}

export default profileReducer;

export const getUserProfile = (userId): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setUserStatus(data));
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(actions.setUserStatus(status));
    }
}

export const saveAvatar = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.saveAvatar(file);
    if (data.resultCode === 0) {
        dispatch(actions.saveAvatarSuccess(data.data.photos));
    }
}

export const saveProfile = (profile: ProfileType, setStatus): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
        await dispatch(getUserProfile(userId));
    }
    else {
        let message = data.messages.length > 0 ? data.messages[0] : "Some error";
        setStatus({message: message});
        return Promise.reject(data.messages[0]);
    }
}