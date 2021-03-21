import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import avt1 from '../Image/5.jpg'
import avt4 from '../Image/4.jpg'
import './Chat.css'
import queryString from 'query-string'
import ChatAPI from '../API/Chat';

import io from "socket.io-client";
const socket = io("http://localhost:8080");


function Chat(props) {

    // State dùng để load cuộc trò chuyện
    const [load_message, set_load_message] = useState(false)

    // Hàm này dùng để active user khi mình bấm chọn
    const [active_user, set_active_user] = useState('')

    // State user_personal
    const [user_personal, set_user_personal] = useState({})

    const hander_Click_User = (id) => {
        set_active_user(id)

        set_id_user2(id)

        // Tìm kiếm thông tin user mà mình muốn chat
        const find_user = users.find(value => {
            return value._id === id
        })

        set_user_personal(find_user)

        // Khi mà bấm vào user để xem tin nhắn thì nó sẽ chạy lại hàm useEffect của load_message
        set_load_message(true)

    }

    
    const [users, set_users] = useState([])

    const [search, set_search] = useState('')

    // Hàm này dùng để gọi API hiển thị những user đang được mình follow
    // thụ thuộc vào state search
    useEffect(() => {

        const fetchData = async () => {

            const params = {
                id_user: sessionStorage.getItem('id_user'),
                search: search
            }

            const query = '?' + queryString.stringify(params)

            const response = await ChatAPI.get_users_chat(query)

            console.log(response)

            set_users(response)

        }

        fetchData()

    }, [search])


    // State id_user2
    const [id_user2, set_id_user2] = useState('')

    const [conversation, set_conversation] = useState([])

    // Hàm này dùng để gọi API load cuộc trò chuyện dựa vào state id_user
    useEffect(() => {

        if (load_message){

            const fetchData = async () => {

                const params = {
                    id_user1: sessionStorage.getItem('id_user'),
                    id_user2: id_user2
                }
    
                const query = '?' + queryString.stringify(params)
    
                const response = await ChatAPI.get_message_chat(query)
                console.log(response)
    
                set_conversation(response.content)
    
            }
    
            fetchData()

            set_load_message(false)

            // Sau khi chạy xong thì tiếp tục load lại tất cả cuộc trò chuyện
            set_load_all_converstaion(true)

        }

    }, [load_message])


    // Hàm này dùng để gửi tin nhắn
    const [message, set_message] = useState('')

    const [checking, set_checking] = useState('')

    // Hàm này dùng để kiểm tra đối phương có follow mình chưa
    async function CheckingData(){

        const params = {
            id_user1: sessionStorage.getItem('id_user'),
            id_user2: id_user2
        }

        const query = '?' + queryString.stringify(params)

        const response = await ChatAPI.checking_conversation(query)

        if (response === 'That Bai'){
            return false
        }else{
            return true
        }
    }

    const handler_send_message = () => {

        const checking = CheckingData()

        if (!checking){
            alert("Khong thể gửi tin nhắn vì được bạn chưa được follow!")
            set_message('')
            return
        }

        //Khi gửi tin nhắn thì nó sẽ lấy id của cả 2 người
        // sử dụng socket để gửi lên phía server
        const data = {
            id_user1: sessionStorage.getItem('id_user'),
            id_user2: id_user2,
            message: message,
            category: 'send'
        }

        socket.emit('send_message', data)

        //Tiếp theo nó sẽ gọi api đưa dữ liệu vào database
        const fetchData = async () => {

            const query = '?' + queryString.stringify(data)

            const response = await ChatAPI.post_message_chat(query)
            
            console.log(response)

        }

        fetchData()

        set_load_message(true)

        set_message('')

    }

    useEffect(() => {

        //Nhận dữ liệu từ server gửi lên thông qua socket với key receive_message
        socket.on('receive_message', (data) => {
            
            //Sau đó nó sẽ setLoad gọi lại hàm useEffect lấy lại dữ liệu
            set_load_message(true)

            set_load_all_converstaion(true)
  
        })

    }, [])


    // State all_conversation
    const [all_converstaion, set_all_converstaion] = useState([])

    const [load_all_converstaion, set_load_all_converstaion] = useState(true)

    // Hàm này dùng để gọi API lấy tất cả các cuộc trò chuyện của user đó
    useEffect(() => {

        if (load_all_converstaion){

            const fetchData = async () => {

                const response = await ChatAPI.get_all_conversation(sessionStorage.getItem('id_user'))
    
                set_all_converstaion(response)
    
            }
    
            fetchData()

            set_load_all_converstaion(false)
        }

    }, [load_all_converstaion])





    return (
        <div className="container mt-4 pt-5">
            <div className="group_chat">
                <div className="group_list_user">
                    <div className="header_list_user">
                        <p className="text-center pt-3 p_header_list_user">nkt.9920</p>
                    </div>
                    <hr />
                    <div>
                        <div className="group_message_search d-flex justify-content-between pl-3 pr-3" >
                            <p style={{ fontWeight: '600' }}>Messages</p>
                            <input className="txt_message_search" type="text" placeholder="Search..." onChange={(e) => set_search(e.target.value)} />
                        </div>
                        <div className="group_friend_chat">
                            {
                                users && users.map((value) => (
                                    <div className={active_user === value._id ? 'group_personal d-flex p-3 personal_active' : 'group_personal d-flex p-3'}
                                        onClick={() => hander_Click_User(value._id)} key={value._id}>
                                        <img src={value.image_profile} alt="" className="image_personal" />
                                        <div className="ml-3 mt-2">
                                            <span style={{ fontWeight: '600' }}>{value.username}</span>
                                            <br />
                                            <span style={{ color: 'gray' }}>{value.name}</span>
                                        </div>
                                        {
                                            all_converstaion && all_converstaion.map(e => (
                                                <div key={e._id}>
                                                    {
                                                        (value._id === e.id_user2 && e.count_message > 0) && <span className="count_message">{e.count_message}</span>
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
                <div className="group_list_message">
                    <div className="header_list_message d-flex">
                        {
                            user_personal && <img src={user_personal.image_profile} alt="" className="image_message" />
                        }
                        <div className="ml-3 mt-1">
                            <span style={{ fontWeight: '600' }}>
                                {
                                    user_personal && user_personal.username
                                }
                            </span>
                            <br />
                            <span style={{ color: 'gray' }}>
                                {
                                    user_personal && user_personal.name
                                }
                            </span>
                        </div>
                    </div>
                    <hr className="hr_message" />
                    <div className="body_list_message">
                        {
                            conversation && conversation.map(value => (
                                <div key={value.id}>
                                    { value.category === 'send' ? (
                                        <div className="d-flex justify-content-end mt-1">
                                            <a className="a_message_send mt-1">{value.message}</a>
                                        </div>
                                        ) : (
                                        <div className="d-flex">
                                            <img src={user_personal.image_profile} alt="" className="message_receive mt-2" />
                                            <a className="a_message_receive ml-2 mt-1">{value.message}</a>
                                        </div>
                                        )
                                    }
                                </div>
                            ))
                        } 
                    </div>
                    <div className="footer_list_message pl-3 pr-3 pb-3">
                        <div className="icon_message_send d-flex">
                            <i className="fa fa-smile-o fa-2x icon_footer" style={{ cursor: 'pointer' }}></i>
                            <input className="input_footer ml-3" type="text" placeholder="Message..." value={message} onChange={(e) => set_message(e.target.value)} />
                            <i className="fa fa-send-o ml-3" onClick={handler_send_message} style={{ fontSize: '24px', cursor: 'pointer' }}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;