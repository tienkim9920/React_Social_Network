import axiosClient from './axiosClient'

const Comment = {

    get_all_comment: (id) => {
        const url = `/comment/${id}`
        return axiosClient.get(url)
    },

    post_comment: (query) => {
        const url = `/comment/${query}`
        return axiosClient.post(url)
    },


}

export default Comment