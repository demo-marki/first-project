import {ResultCodeEnum} from "../api/api.ts";
import {securityAPI} from "../api/security-api.ts";
import {authAPI} from "../api/auth-api.ts";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type){
        case 'SN/AUTH/SET-USER-DATA':
        case 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

const actions = {
    setAuthUserData: (userId: number, email: string, login: string, isAuth: boolean) => ({
        type: 'SN/AUTH/SET-USER-DATA', payload: {userId, email,login, isAuth}} as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}} as const)
}

export const getAuthInfoThunkCreator = (): ThunkType => async (dispatch) => {
    let data = await authAPI.me();

    if (data.resultCode === 0) {
        let {id, login, email} = data.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha, setStatus): ThunkType => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);

    if (data.resultCode === ResultCodeEnum.Success) {
        await dispatch(getAuthInfoThunkCreator());
    } else {
        if (data.resultCode === ResultCodeEnum.CaptchaIsRequired){
            await dispatch(getCaptchaUrl());
        }

        let message = data.messages.length > 0 ? data.messages[0] : "Some error";
        setStatus({message: message});
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logout();

    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;

    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
}

export default authReducer;