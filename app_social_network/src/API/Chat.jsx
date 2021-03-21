import axiosClient from './axiosClient'

const ChatAPI = {

    get_users_chat: (query) => {
        const url = `/chat/${query}`
        return axiosClient.get(url)
    },

    get_message_chat: (query) => {
        const url = `/chat/message/${query}`
        return axiosClient.get(url)
    },

    post_message_chat: (query) => {
        const url = `/chat/message/send${query}`
        return axiosClient.post(url)
    },

    get_all_conversation: (id) => {
        const url = `/chat/${id}`
        return axiosClient.get(url)
    },

    checking_conversation: (query) => {
        const url = `/chat/message/checking${query}`
        return axiosClient.get(url)
    },


}

export default ChatAPI