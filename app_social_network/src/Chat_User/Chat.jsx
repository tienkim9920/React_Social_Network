import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import avt1 from '../Image/5.jpg'
import avt4 from '../Image/4.jpg'
import './Chat.css'


function Chat(props) {

    const [users, set_users] = useState([
        { id: '1', name: 'quynhon.city', subname: 'Tiền Kim', image: avt1 },
        { id: '2', name: 'hieuluong.1101', subname: 'Hiếu Lương', image: avt4 },
        { id: '3', name: 'hieuluong.1101', subname: 'Hiếu Lương', image: avt4 },
        { id: '4', name: 'hieuluong.1101', subname: 'Hiếu Lương', image: avt4 },
        { id: '5', name: 'hieuluong.1101', subname: 'Hiếu Lương', image: avt4 },
        { id: '6', name: 'hieuluong.1101', subname: 'Hiếu Lương', image: avt4 },
        { id: '7', name: 'hieuluong.1101', subname: 'Hiếu Lương', image: avt4 },
    ])


    // Hàm này dùng để active user khi mình bấm chọn
    const [active_user, set_active_user] = useState('')

    const hander_Click_User = (id) => {
        set_active_user(id)
    }


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
                            <input className="txt_message_search" type="text" placeholder="Search..." />
                        </div>
                        <div className="group_friend_chat">
                            {
                                users && users.map((value) => (
                                    <div className={active_user === value.id ? 'group_personal d-flex p-3 personal_active' : 'group_personal d-flex p-3'}
                                        onClick={() => hander_Click_User(value.id)} key={value.id}>
                                        <img src={value.image} alt="" className="image_personal" />
                                        <div className="ml-3 mt-2">
                                            <span style={{ fontWeight: '600' }}>{value.name}</span>
                                            <br />
                                            <span style={{ color: 'gray' }}>{value.subname}</span>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
                <div className="group_list_message">
                    <div className="header_list_message d-flex">
                        <img src={avt4} alt="" className="image_message" />
                        <div className="ml-3 mt-1">
                            <span style={{ fontWeight: '600' }}>hieuluong.1101</span>
                            <br />
                            <span style={{ color: 'gray' }}>Hiếu Lương</span>
                        </div>
                    </div>
                    <hr className="hr_message" />
                    <div className="body_list_message">
                        <div className="d-flex justify-content-end mt-1">
                            <a className="a_message_send">Hé Lô</a>
                        </div>
                        <div className="d-flex">
                            <img src={avt4} alt="" className="message_receive mt-2" />
                            <a className="a_message_receive ml-2">Xin chào</a>
                        </div>
                        <div className="d-flex justify-content-end mt-1">
                            <a className="a_message_send">Hé Lô</a>
                        </div>
                        <div className="d-flex">
                            <img src={avt4} alt="" className="message_receive mt-2" />
                            <a className="a_message_receive ml-2">Xin chào</a>
                        </div>
                        <div className="d-flex justify-content-end mt-1">
                            <a className="a_message_send">Hé Lô</a>
                        </div>
                        <div className="d-flex">
                            <img src={avt4} alt="" className="message_receive mt-2" />
                            <a className="a_message_receive ml-2">Xin chào</a>
                        </div>
                        <div className="d-flex justify-content-end mt-1">
                            <a className="a_message_send">Hé Lô</a>
                        </div>
                        <div className="d-flex">
                            <img src={avt4} alt="" className="message_receive mt-2" />
                            <a className="a_message_receive ml-2">Xin chào</a>
                        </div>
                        <div className="d-flex justify-content-end mt-1">
                            <a className="a_message_send">Hé Lô</a>
                        </div>
                        <div className="d-flex">
                            <img src={avt4} alt="" className="message_receive mt-2" />
                            <a className="a_message_receive ml-2">Xin chào</a>
                        </div>
                        <div className="d-flex justify-content-end mt-1">
                            <a className="a_message_send">Hé Lô</a>
                        </div>
                        <div className="d-flex">
                            <img src={avt4} alt="" className="message_receive mt-2" />
                            <a className="a_message_receive ml-2">Xin chào</a>
                        </div>
                        <div className="d-flex justify-content-end mt-1">
                            <a className="a_message_send">Hé Lô</a>
                        </div>
                        <div className="d-flex">
                            <img src={avt4} alt="" className="message_receive mt-2" />
                            <a className="a_message_receive ml-2">Xin chào</a>
                        </div>
                        <div className="d-flex justify-content-end mt-1">
                            <a className="a_message_send">Hé Lô</a>
                        </div>
                        <div className="d-flex">
                            <img src={avt4} alt="" className="message_receive mt-2" />
                            <a className="a_message_receive ml-2">Xin chào</a>
                        </div>
                    </div>
                    <div className="footer_list_message pl-3 pr-3 pb-3">
                        <div className="icon_message_send d-flex">
                            <i className="fa fa-smile-o fa-2x icon_footer" style={{ cursor: 'pointer' }}></i>
                            <input className="input_footer ml-3" type="text" placeholder="Message..." />
                            <i className="fa fa-send-o ml-3" style={{ fontSize: '24px', cursor: 'pointer' }}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;