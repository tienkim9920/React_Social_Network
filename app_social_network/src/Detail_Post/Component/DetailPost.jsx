import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './DetailPost.css'
import avt from '../../Image/5.jpg'
import { useParams } from 'react-router';
import queryString from 'query-string'
import Users_Activity from '../../API/Users_Activity';
import UsersAPI from '../../API/UsersAPI';
import Like from '../../API/Like';
import Comment from '../../API/Comment';
import Favorite from '../../API/Favorite';

import { Redirect } from 'react-router-dom'

import io from "socket.io-client";
const socket = io("http://localhost:8080");

function DetailPost(props) {

    const { id } = useParams()

    const id_slit = id.split('_')

    const [id_image_post, set_id_image_post] = useState(id_slit[0])

    const [id_user_post, set_id_user_post] = useState(id_slit[1])

    const [post, set_post] = useState({})

    const [reload_post, set_reload_post] = useState(true)


    // Hàm này dùng để load ra bài viết
    useEffect(() => {

        if (reload_post) {
            const params = {
                id_user_post: id_user_post,
                id_image_post: id_image_post
            }

            const query = '?' + queryString.stringify(params)

            console.log(query)

            const fetchData = async () => {

                const response = await Users_Activity.detail_Post(query)
                console.log(response)
                set_post(response)

            }

            fetchData()

            set_reload_post(false)
        }

    }, [reload_post])


    // Hàm này dùng để kiểm tra user đã từng like bài viết này hay chưa
    const [status_like, set_status_like] = useState(null)

    const [load_status_like, set_load_status_like] = useState(true)

    useEffect(() => {

        if (load_status_like) {

            const fetchData = async () => {

                const params = {
                    id_user: sessionStorage.getItem('id_user'),
                    id_image_post: id_image_post
                }

                const query = '?' + queryString.stringify(params)

                const response = await Like.checking_like(query)
                console.log(response)

                if (response !== 'That Bai') {
                    set_status_like(true)
                } else {
                    set_status_like(false)
                }

            }

            fetchData()

            set_load_status_like(false)

        }

    }, [load_status_like])


    const [user, set_user] = useState({})

    // Hàm này dùng để load ra thông tin user đã đăng bài đó
    useEffect(() => {

        const fetchData = async () => {

            const response = await UsersAPI.getId(id_user_post)
            set_user(response)

        }

        fetchData()

    }, [])



    // Hàm này dùng để tym
    const handler_Tym = () => {

        const fetchData = async () => {

            const params = {
                id_user: sessionStorage.getItem('id_user'),
                id_image_post: id_image_post
            }

            const query = '?' + queryString.stringify(params)

            const response = await Like.post_like(query)
            console.log(response)


            // Xử lý thêm dữ liệu vào Database Favorite
            const params_far = {
                id_user: sessionStorage.getItem('id_user'),
                id_user_another: id_user_post,
                id_image_post: id_image_post,
                category: false
            }

            const query_far = '?' + queryString.stringify(params_far)

            const response_far = await Favorite.post_Favorite(query_far)
            console.log(response_far)

        }

        fetchData()


        // Bắt đầu gửi socket
        const data = {
            id_user: sessionStorage.getItem('id_user'),
            id_user_another: id_user_post
        }

        socket.emit('like', data)

        set_reload_post(true)

        set_load_status_like(true)

    }


    // Hàm này dùng để hủy tym
    const handler_UnTym = () => {

        const fetchData = async () => {

            const params = {
                id_user: sessionStorage.getItem('id_user'),
                id_image_post: id_image_post
            }

            const query = '?' + queryString.stringify(params)

            const response = await Like.put_unlike(query)
            console.log(response)

        }

        fetchData()

        const deleteData = async () => {

            // Xử lý delete dữ liệu Database Favorite
            const params = {
                id_user: id_user_post,
                id_user_another: sessionStorage.getItem('id_user'),
            }

            const query = '?' + queryString.stringify(params)

            console.log(query)

            const response = await Favorite.delete_Favorite(query)
            console.log(response)

        }


        deleteData()

        set_reload_post(true)

        set_load_status_like(true)

    }


    // State data của comment
    const [comments, set_comments] = useState([])

    // State dùng để load lại hàm useEffect
    const [load_comment, set_load_comment] = useState(true)

    // Hàm này dùng để gọi API load dữ liệu trong database comment ra
    useEffect(() => {

        if (load_comment) {

            const fetchData = async () => {

                const response = await Comment.get_all_comment(id_image_post)
                console.log(response)

                set_comments(response)

            }

            fetchData()

            set_load_comment(false)

        }

    }, [load_comment])


    // State send cua input
    const [send, set_send] = useState('')

    // Hàm này dùng để xử lý khi user muốn comment bài viết
    const handler_Comment = () => {

        const fetchData = async () => {

            const params = {
                id_user: sessionStorage.getItem('id_user'),
                id_image_post: id_image_post,
                send: send
            }

            const query = '?' + queryString.stringify(params)

            const response = await Comment.post_comment(query)
            console.log(response)


            // Xử lý thêm dữ liệu vào Database Favorite
            const params_far = {
                id_user: sessionStorage.getItem('id_user'),
                id_user_another: id_user_post,
                id_image_post: id_image_post,
                category: true
            }

            const query_far = '?' + queryString.stringify(params_far)

            const response_far = await Favorite.post_Favorite(query_far)
            console.log(response_far)

        }

        fetchData()


        // Bắt đầu gửi socket
        const data = {
            id_user: sessionStorage.getItem('id_user'),
            id_user_another: id_user_post
        }

        socket.emit('like', data)


        set_load_comment(true)

        set_send('')

    }


    // State redirect
    const [redirect, set_redirect] = useState(false)

    const handler_Post_Delete = () => {

        const fetchData = async () => {

            const params = {
                id_user: id_user_post,
                id_image_post: id_image_post
            }

            const query = '?' + queryString.stringify(params)

            const response = await Users_Activity.delete_Post(query)
            console.log(response)

        }

        fetchData()

        set_redirect(true)
    }


    const [users_like, set_users_like] = useState([])

    useEffect(() => {
        const fetchData = async () => {

            const params = {
                id_image_post: id_image_post
            }

            const query = '?' + queryString.stringify(params)

            const response = await Like.count_like(query)

            set_users_like(response)

        }

        fetchData()

    }, [])


    return (
        <div className="container mt-5 pt-4">
            <div className="group_detail_post">
                <div className="group_image_detail_post">
                    <img src={post.image_body} alt="" className="image_detail_post" />
                </div>
                <div className="group_content_detail_post">
                    <div className="header_detail_post pt-3 pl-3 pr-3 d-flex justify-content-between">
                        <div>
                            <img src={user.image_profile} alt="" className="image_header_detail_post" />
                            <span className="ml-3" style={{ fontWeight: '600' }}>{user.username}</span>
                        </div>
                        {
                            id_user_post === sessionStorage.getItem('id_user') &&
                            <i className="fa fa-close mt-1"
                                data-toggle="modal"
                                data-target={`#${id_image_post}`}
                                style={{ fontSize: '25px' }}></i>
                        }

                        <div className="modal fade mt-5" id={`${id_image_post}`} tabIndex="-1" role="dialog" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Do you want to delete post this?</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body text-center">
                                        {
                                            redirect && <Redirect to={`/account/${sessionStorage.getItem('id_user')}`} />
                                        }
                                        <div className="btn btn-primary" data-dismiss="modal" aria-label="Close" onClick={handler_Post_Delete} >YES</div>
                                        &nbsp;
                                        <button type="button" className="btn btn-danger" data-dismiss="modal" aria-label="Close">NO</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <hr />
                    <div className="body_detail_post pt-1 pl-3">

                        {
                            comments && comments.map(value => (
                                <div className="detail_comment_post pb-3" key={value._id}>
                                    <img src={value.image_profile} alt="" className="image_header_detail_post" />
                                    <span className="ml-3" style={{ fontWeight: '600' }}>{value.username}</span>
                                    &nbsp;
                                    <span style={{ fontSize: '1rem' }}>{value.cmt_user}</span>
                                </div>
                            ))
                        }
                    </div>
                    <hr />
                    <div>
                        <div className="action_post_body d-flex justify-content-between">
                            <div className="left_action pl-3">
                                {status_like ? <i className="fa fa-heart" onClick={handler_UnTym} style={{ fontSize: '30px', cursor: 'pointer', color: '#f14444' }}></i> :
                                    <i className="fa fa-heart-o" onClick={handler_Tym} style={{ fontSize: '30px', cursor: 'pointer' }}></i>
                                }

                                <i className="fa fa-comment-o ml-3" style={{ fontSize: '30px', cursor: 'pointer' }}></i>
                                <i className="fa fa-send-o ml-3" style={{ fontSize: '30px', cursor: 'pointer' }}></i>
                            </div>
                            <div className="right_action pr-3">
                                <i className="fa fa-star-o" style={{ fontSize: '30px', cursor: 'pointer' }}></i>
                            </div>
                        </div>
                        <span className="ml-3" style={{ fontWeight: '600', cursor: 'pointer' }}
                            data-toggle="modal"
                            data-target={`#${id_image_post}_like`}
                        >{post.like} like</span>

                        {/* Đây là phần Modal khi mà user muốn bấm xem có bao nhiêu người like */}
                        <div className="modal fade mt-5" id={`${id_image_post}_like`} role="dialog" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">List Favorite</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body fix-modal-body">
                                        {
                                            users_like && users_like.map(value => (
                                                <div className="box_user_me d-flex pb-3" key={value._id}>
                                                    <img className="image_user_me" src={value.image_profile} alt="" />
                                                    <div className="title_user_me d-flex justify-content-between ml-3">
                                                        <div className="name_user_me">
                                                            <div style={{ fontWeight: '600' }}>{value.username}</div>
                                                            <div style={{ color: 'gray' }}>{value.name}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr />
                    <div className="post_footer d-flex pl-3 pr-3 pb-3">
                        <i className="fa fa-smile-o fa-2x icon_footer" style={{ cursor: 'pointer' }}></i>
                        <input className="input_footer ml-3" type="text" placeholder="Add a comment" value={send} onChange={(e) => set_send(e.target.value)} />
                        <a className="send_footer ml-3 mt-1" style={{ cursor: 'pointer' }} onClick={handler_Comment} >Post</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailPost;