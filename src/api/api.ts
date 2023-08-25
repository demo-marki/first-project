import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "f204a3e9-03fa-46e8-9050-6551dd4461d1"
    }
});

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

export type APIResponseType<T = {}, RC = ResultCodeEnum> = {
    data: T
    messages: Array<string>
    resultCode: RC
}

export type GetItemsType<T> = {
    items: Array<T>
    totalCount: number
    error: string
}

