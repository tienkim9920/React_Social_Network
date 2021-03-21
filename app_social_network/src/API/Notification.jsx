import axiosClient from './axiosClient'

const Notification = {

    get_Notification: (id) => {
        const url = `/notification/${id}`
        return axiosClient.get(url)
    },

    post_Notification: (query) => {
        const url = `/notification/${query}`
        return axiosClient.post(url)
    },

    delete_Notification: (query) => {
        const url = `/notification/${query}`
        return axiosClient.delete(url)
    },

    put_Notification: (query) => {
        const url = `/notification/${query}`
        return axiosClient.put(url)
    },

}

export default Notification