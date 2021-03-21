import axiosClient from './axiosClient'

const Following = {

    get_following: (id) => {
        const url = `/following/${id}`
        return axiosClient.get(url)
    },

    get_status_following: (query) => {
        const url = `/following/${query}`
        return axiosClient.get(url)
    },

    post_status_following: (query) => {
        const url = `/following/${query}`
        return axiosClient.post(url)
    },

    delete_status_following: (query) => {
        const url = `/following/${query}`
        return axiosClient.delete(url)
    },

    get_all_following: (query) => {
        const url = `/following/get/follow${query}`
        return axiosClient.get(url)
    },

    get_all_follower: (query) => {
        const url = `/following/get/follower${query}`
        return axiosClient.get(url)
    },

}

export default Following