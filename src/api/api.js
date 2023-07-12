import axios from "axios";

const instance = axios.create({
    withCredentials:true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "7aaa74d4-1f75-4751-9b2d-2473fe90279b"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },

    getUserProfile(userId){
        console.warn('Obsolete method. Please use profileAPI object')
        return profileAPI.getProfile(userId);
    },

    getAuthInfo() {
        return instance.get('auth/me')
            .then(response => response.data);
    },

    unfollow(id) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data);
    },

    follow (id) {
        return instance.post(`follow/${id}`)
            .then(response => response.data);
    }
}

export const profileAPI = {
    getProfile(userId){
        return instance.get(`profile/${userId}`)
            .then(response => response.data);
    },

    getStatus(userId){
        return instance.get(`profile/status/${userId}`)
            .then(response => response.data);
    },

    updateStatus(status){
        return instance.put(`profile/status`, {status: status})
            .then(response => response.data);
    }
}
