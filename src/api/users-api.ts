import {GetItemsType, instance, APIResponseType} from "./api.ts";
import {UserType} from "../types/types";

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term = "", friend: null | boolean = null) {
        return instance.get<GetItemsType<UserType>>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(response => response.data);
    },

    unfollow(id: number) {
        return instance.delete<APIResponseType>(`follow/${id}`)
            .then(response => response.data);
    },

    follow(id: number) {
        return instance.post<APIResponseType>(`follow/${id}`)
            .then(response => response.data);
    }
}