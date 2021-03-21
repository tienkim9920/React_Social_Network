import axiosClient from './axiosClient'

const UsersAPI = {

    getAll: () => {
        const url = `/users`
        return axiosClient.get(url)
    },

    getId: (id) => {
        const url = `/users/${id}`
        return axiosClient.get(url)
    },

    search_Users: (query) => {
        const url = `/users/search/keyword${query}`
        return axiosClient.get(url)
    },

    postSignIn: (query) => {
        const url = `/users/signin${query}`
        return axiosClient.post(url)
    },

    postSignUp: (query) => {
        const url = `/users/signup${query}`
        return axiosClient.post(url)
    },

    update_info: (query) => {
        const url = `/users/update${query}`
        return axiosClient.put(url)
    },

    change_password: (query) => {
        const url = `/users/change/password${query}`
        return axiosClient.put(url)
    },

    change_avatar: (query) => {
        const url = `/users/update/avatar${query}`
        return axiosClient.put(url)
    }

}

export default UsersAPI