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

    postSignIn: (query) => {
        const url = `/users/signin${query}`
        return axiosClient.post(url)
    },

    postSignUp: (query) => {
        const url = `/users/signup${query}`
        return axiosClient.post(url)
    }

}

export default UsersAPI