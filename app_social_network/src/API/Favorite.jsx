import axiosClient from './axiosClient'

const Favorite = {

    get_all_favorite: (id) => {
        const url = `/favorite/${id}`
        return axiosClient.get(url)
    },

    post_Favorite: (query) => {
        const url = `/favorite/${query}`
        return axiosClient.post(url)
    },

    delete_Favorite: (query) => {
        const url = `/favorite/${query}`
        return axiosClient.delete(url)
    },

    put_Favorite: (query) => {
        const url = `/favorite/${query}`
        return axiosClient.put(url)
    },

}

export default Favorite