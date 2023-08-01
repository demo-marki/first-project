import axios from "axios";

const instance = axios.create({
    withCredentials:true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "f204a3e9-03fa-46e8-9050-6551dd4461d1"
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

export const authAPI = {
    me() {
        return instance.get('auth/me')
            .then(response => response.data);
    },
    login (email, password, rememberMe = false){
        return instance.post('auth/login', {email, password, rememberMe})
            .then(response => response.data);
    },
    logout (){
        return instance.delete('auth/login')
            .then(response => response.data);
    }
}
