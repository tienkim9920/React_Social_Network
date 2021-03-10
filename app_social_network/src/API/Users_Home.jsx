import axiosClient from './axiosClient'

const Users_Home = {

    get_Users_Home: (query) => {
        const url = `/users_home${query}`
        return axiosClient.get(url)
    },

    post_Status_User: (query) => {
        const url = `/users_home/post${query}`
        return axiosClient.post(url)
    }

}

export default Users_Home