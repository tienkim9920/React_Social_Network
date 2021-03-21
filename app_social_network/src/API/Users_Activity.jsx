import axiosClient from './axiosClient'

const Users_Activity = {

    get_Users_Activity: (id) => {
        const url = `/users_activity/${id}`
        return axiosClient.get(url)
    },

    post_Activity_Following: (query) => {
        const url = `/users_activity/following/${query}`
        return axiosClient.post(url)
    },

    delete_Activity_Unfollowing: (query) => {
        const url = `/users_activity/unfollowing/${query}`
        return axiosClient.delete(url)
    },

    detail_Post: (query) => {
        const url = `/users_activity/${query}`
        return axiosClient.get(url)
    },

    delete_Post: (query) => {
        const url = `/users_activity/delete/post${query}`
        return axiosClient.delete(url)
    }

}

export default Users_Activity