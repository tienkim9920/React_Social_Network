import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './DetailUser.css'
import avt1 from '../../Image/5.jpg'
import { Link, useParams } from 'react-router-dom';
import UsersAPI from '../../API/UsersAPI';
import queryString from 'query-string'
import Following from '../../API/Following';
import Users_Activity from '../../API/Users_Activity';
import Notification from '../../API/Notification';

import io from "socket.io-client";
const socket = io("http://localhost:8080");


DetailUser.propTypes = {

};

function DetailUser(props) {

    // Lấy id params
    const { id } = useParams()

    const [check_follow, set_check_follow] = useState('')
    const [reload_follow, set_reload_follow] = useState('')


    // ------- Phần này dùng để lấy dữ liệu của chính user hoặc user another mà mình muốn xem
    const [user, set_user] = useState({})

    const [user_activity, set_user_activity] = useState({})

    const [check_list_image, set_check_list_image] = useState(false)

    useEffect(() => {

        // Lấy dữ liệu từ API users
        const fetchData = async () => {

            const response = await UsersAPI.getId(id)

            set_user(response)

        }

        fetchData()

    }, [id])


    // Hàm này dùng để check xem user có đang following người này không
    useEffect(() => {

        const fetchData = async () => {

            const params = {
                id_user: sessionStorage.getItem('id_user'),
                id_user_following: id
            }

            const query = '?' + queryString.stringify(params)

            // Gọi tới API của controller Following
            const response = await Following.get_status_following(query)

            console.log(response)

            set_check_follow(response)

        }

        fetchData()

    }, [reload_follow])


    // Hàm này dùng để gọi là API của database user_activity lần đầu
    useEffect(() => {

        // Lấy dữ liệu từ API users_activity
        const fetch_users_activity = async () => {

            const response = await Users_Activity.get_Users_Activity(id)
            console.log(response)

            set_user_activity(response)

            // Phần này dùng để check xem list_image có phần tử nào chưa
            if (response.list_image.length > 0) {
                set_check_list_image(true)
            } else {
                set_check_list_image(false)
            }

        }

        fetch_users_activity()

    }, [id])
    // ------- Phần này dùng để lấy dữ liệu của chính user hoặc user another mà mình muốn xem


    // Hàm này dùng để gọi là API của database user_activity khi mà bấm vào follow hoặc unfollow
    async function GET_API_activity() {

        const response_GET = await Users_Activity.get_Users_Activity(id)

        set_user_activity(response_GET)

        // Phần này dùng để check xem list_image có phần tử nào chưa
        if (response_GET.list_image.length > 0) {
            set_check_list_image(true)
        } else {
            set_check_list_image(false)
        }

    }


    // Hàm này dùng để gọi API create database cho những bài đăng khi mình bấm following
    async function POST_API_Activity_Following() {

        const params = {
            id_user: sessionStorage.getItem('id_user'),
            id_user_following: id
        }

        const query = '?' + queryString.stringify(params)

        const response = await Users_Activity.post_Activity_Following(query)
        console.log(response)

    }

    // Hàm này dùng để gọi API delete database cho những bài đăng khi mình bấm unfollowing
    async function DELETE_API_Activity_Unfollowing() {

        const params = {
            id_user: sessionStorage.getItem('id_user'),
            id_user_following: id
        }

        const query = '?' + queryString.stringify(params)

        const response = await Users_Activity.delete_Activity_Unfollowing(query)
        console.log(response)

    }

    // Hàm này dùng để gọi API create database để tạo ra thông báo cho user được mình vừa bấm follow
    // user được mình bấm following sẽ hiện thông báo
    async function POST_API_Notification() {

        const params = {
            id_user: sessionStorage.getItem('id_user'),
            id_user_another: id
        }

        const query = '?' + queryString.stringify(params)

        const response = await Notification.post_Notification(query)
        console.log(response)

    }

    // Hàm này dùng để gọi API delete database để xóa ra thông báo của user được mình vừa bấm unfollow
    // user được mình bấm unfollowing sẽ mất thông báo
    async function DELETE_API_Notification() {

        const params = {
            id_user: sessionStorage.getItem('id_user'),
            id_user_another: id
        }

        const query = '?' + queryString.stringify(params)

        const response = await Notification.delete_Notification(query)
        console.log(response)

    }



    // Hàm này dùng để Following user
    const handler_Follow = () => {

        const fetchData = async () => {

            const params = {
                id_user: sessionStorage.getItem('id_user'),
                id_user_following: id
            }

            const query = '?' + queryString.stringify(params)

            // Gọi tới API của controller Following
            const response = await Following.post_status_following(query)
            console.log(response)

            GET_API_activity()

            POST_API_Activity_Following()

            POST_API_Notification()

        }

        fetchData()

        const data = {
            id_user: sessionStorage.getItem('id_user'),
            id_user_following: id
        }

        socket.emit('following', data)

        set_reload_follow('true')

    }

    // Hàm này dùng để UnFollowing user
    const handler_UnFollow = () => {

        const fetchData = async () => {

            const params = {
                id_user: sessionStorage.getItem('id_user'),
                id_user_following: id
            }

            const query = '?' + queryString.stringify(params)

            // Gọi tới API của controller Following
            const response = await Following.delete_status_following(query)
            console.log(response)

            GET_API_activity()

            DELETE_API_Activity_Unfollowing()

            DELETE_API_Notification()

        }

        fetchData()

        set_reload_follow('false')

    }


    // Hàm này dùng để nhận socket từ server gửi lên với key show_notification
    // và sau đó thay đổi state set_load_notification chạy lại hàm useEffect
    const [load_notification, set_load_notification] = useState(true)

    useEffect(() => {

        socket.on('show_notification', (data) => {

            if (data.id_user === sessionStorage.getItem('id_user')) {

                set_load_notification(true)

                console.log('Xu Ly SocKet Thanh Cong')

            }

        })

    }, [])

    useEffect(() => {

        if (load_notification) {
            // Lấy dữ liệu từ API users_activity
            const fetch_users_activity = async () => {

                const response = await Users_Activity.get_Users_Activity(id)
                console.log(response)

                set_user_activity(response)

            }

            fetch_users_activity()

            set_load_notification(false)
        }

    }, [load_notification])



    // Phần này xử lý load ra danh sách người dùng mình đang follow
    const [list_following, set_list_following] = useState([])

    useEffect(() => {

        const fetchData = async () => {

            const params = {
                id_user: id
            }

            const query = '?' + queryString.stringify(params)

            const response = await Following.get_all_following(query)

            set_list_following(response)

        }

        fetchData()

    }, [])


    // Phần này xử lý load ra danh sách người dùng đang follow mình
    const [list_follower, set_list_follower] = useState([])

    useEffect(() => {

        const fetchData = async () => {

            const params = {
                id_user: id
            }

            const query = '?' + queryString.stringify(params)

            const response = await Following.get_all_follower(query)

            set_list_follower(response)

        }

        fetchData()

    }, [])


    return (
        <div className="container mt-5 pt-5">
            <div className="group_profile">
                <div className="profile pb-4">
                    <div className="left_profile d-flex justify-content-center">
                        <img src={user.image_profile} alt="" className="image_profile" />
                    </div>
                    <div className="right_profile">
                        <div>
                            <span style={{ fontSize: '2rem', fontWeight: '300' }}>{user.username}</span>
                        </div>
                        <div className="mt-2 mb-2">
                            {
                                sessionStorage.getItem('id_user') === id ?
                                    (<Link to={`/account/${sessionStorage.getItem('id_user')}/setting`}
                                        className="a_edit_profile">Edit Profile</Link>) :
                                    (check_follow === 'true' ? <span className="a_edit_profile" onClick={handler_UnFollow}>Followed</span> :
                                        <span className="a_edit_profile btn_follow_profile" onClick={handler_Follow}>Follow</span>
                                    )
                            }
                        </div>
                        <div className="mt-3 mb-2">
                            <span><i style={{ fontWeight: '600' }}>{user_activity.post}</i> Post</span>
                            <span className="ml-4"
                                style={{ cursor: 'pointer' }}
                                data-toggle="modal" 
                                data-target="#follower"                            
                                ><i style={{ fontWeight: '600' }}>{user_activity.followers}</i> Followers</span>
                            <span className="ml-4" 
                                style={{ cursor: 'pointer' }}
                                data-toggle="modal" 
                                data-target="#following"
                                ><i style={{ fontWeight: '600' }}>{user_activity.following}</i> Following</span>

                            <div className="modal fade mt-5" id="following" tabIndex="-1" role="dialog" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">List Following</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body fix-modal-body">
                                            {
                                                list_following && list_following.map(value => (
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

                            <div className="modal fade mt-5" id="follower" tabIndex="-1" role="dialog" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">List Follower</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body fix-modal-body">
                                            {
                                                list_follower && list_follower.map(value => (
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
                        <div>
                            <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>{user.name}</span>
                        </div>
                        <div>
                            <a href={user.website} target="_blank" style={{ fontWeight: '600' }} >{user.website}</a>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="post_image_personal">
                    <div className="group_grid_image_personal">
                        {
                            user_activity.list_image && user_activity.list_image.map(value => (
                                <div className="p-3" key={value.id_image_post}>
                                    <Link to={`/post/${value.id_image_post}_${user_activity.id_user}`}><img src={value.image_body} alt="" className="image_personal_all" /></Link>
                                </div>
                            )
                            )
                        }
                    </div>
                    {
                        !check_list_image && (
                            <div className="d-flex justify-content-center pt-5 pb-5" style={{ fontSize: '100px', color: '#505050' }}>
                                <div>
                                    <div className="d-flex justify-content-center">
                                        <i className="fa fa-camera"></i>
                                    </div>
                                    <h1 style={{ fontWeight: '300' }}>No Post Yet</h1>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="text-center pt-4 pb-4" style={{ color: 'gray' }}>© 2021 Instagram by TienKim Developer</div>
            </div>
        </div>
    );
}

export default DetailUser;