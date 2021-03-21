import axiosClient from './axiosClient'

const Like = {

    post_like: (query) => {
        const url = `/like/${query}`
        return axiosClient.post(url)
    },

    put_unlike: (query) => {
        const url = `/like/${query}`
        return axiosClient.put(url)
    },

    checking_like: (query) => {
        const url = `/like/checking${query}`
        return axiosClient.get(url)
    },

    count_like: (query) => {
        const url = `/like/${query}`
        return axiosClient.get(url)
    },


}

export default Like