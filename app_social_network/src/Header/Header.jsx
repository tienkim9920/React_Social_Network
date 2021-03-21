import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './Header.css'
import avatar from '../Image/test.jpg'
import avatar2 from '../Image/4.jpg'
import avatar3 from '../Image/5.jpg'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { deleteSession } from '../Redux/Action/ActionSession';
import UsersAPI from '../API/UsersAPI';
import Notification from '../API/Notification';
import queryString from 'query-string'

import io from "socket.io-client";
import Favorite from '../API/Favorite';
import Search from './Search';
const socket = io("http://localhost:8080");


Header.propTypes = {

};

function Header(props) {

    const dispatch = useDispatch()

    const location = useLocation()

    const [active_profile, set_active_profile] = useState('')

    // Hàm này dùng để active các profile của header
    // phụ thuộc vào location để cho nó active
    useEffect(() => {

        if (location.pathname.indexOf('chat') > -1) {
            set_active_profile('chat')
        }

        if (location.pathname === '/') {
            set_active_profile('home')
        }

    }, [location])


    // Hàm này dùng để hiện thông báo active tym
    const [tym, set_tym] = useState(false)

    const handler_Click_Tym = () => {
        set_tym(!tym)

        // Sau khi bấm vào tym ta sẽ gọi API
        // Cái này là để check tất cả tym
        const fetchData = async () => {

            const params = {
                id_user: sessionStorage.getItem('id_user')
            }

            const query = '?' + queryString.stringify(params)

            const response = await Favorite.put_Favorite(query)

        }

        fetchData()

        set_load_favorite(true)

        set_count_favorite(0)

    }


    // Hàm này dùng để hiện thông báo active notice
    const [notice, set_notice] = useState(false)

    const handler_Click_Notice = () => {
        set_notice(!notice)
        console.log(notice)

        // Sau khi bấm vào notification ta sẽ gọi API
        // Cái này là để check tất cả notification
        const fetchData = async () => {

            const params = {
                id_user: sessionStorage.getItem('id_user')
            }

            const query = '?' + queryString.stringify(params)

            const response = await Notification.put_Notification(query)

        }

        fetchData()

        set_load_notification(true)

        set_count_notification(0)
    }


    // Hàm này dùng để logout và hủy session trong redux
    const handlerLogout = () => {

        sessionStorage.clear()

        const action = deleteSession('')
        dispatch(action)
        window.location.replace('/signin');

    }


    // ------- Phần này dùng để lấy dữ liệu của chính user
    const [user, set_user] = useState({})

    useEffect(() => {

        const fetchData = async () => {

            const response = await UsersAPI.getId(sessionStorage.getItem('id_user'))

            set_user(response)

        }

        fetchData()

    }, [sessionStorage.getItem('id_user')])
    // ------- Phần này dùng để lấy dữ liệu của chính user



    // state list hiện danh sách thông báo
    const [notifications, set_notifications] = useState([])

    const [count_notification, set_count_notification] = useState(0)

    const [load_notification, set_load_notification] = useState(true)

    // Hàm nào dùng để gọi API lấy dữ liệu notification hiện thông báo
    useEffect(() => {

        if (load_notification) {

            const fetchData = async () => {

                const response = await Notification.get_Notification(sessionStorage.getItem('id_user'))
                console.log(response)

                const data_reverse = response.reverse()

                set_notifications(data_reverse)

                for (let i = 0; i < response.length; i++) {
                    if (response[i].status === false) {

                        set_count_notification(i + 1)

                    }
                }

            }

            fetchData()

            set_load_notification(false)
        }

    }, [load_notification])


    // State favorite
    const [favorite, set_favorite] = useState([])

    const [count_favorite, set_count_favorite] = useState(0)

    const [load_favorite, set_load_favorite] = useState(true)

    // Hàm này dùng để gọi API database favorite cho user
    // phụ thuộc vào state load_favorite
    useEffect(() => {

        if (load_favorite) {

            const fetchData = async () => {

                const response = await Favorite.get_all_favorite(sessionStorage.getItem('id_user'))

                set_favorite(response.reverse())

                for (let i = 0; i < response.length; i++) {
                    if (response[i].status === false) {

                        set_count_favorite(i + 1)

                    }
                }

            }

            fetchData()

            set_load_favorite(false)
        }

    }, [load_favorite])


    // Hàm này dùng để nhận socket từ server gửi lên với key show_notification
    // Hàm này dùng để nhận socket từ server gửi lên với key show_favotire
    useEffect(() => {

        socket.on('show_notification', (data) => {

            if (data.id_user === sessionStorage.getItem('id_user')) {

                set_load_notification(true)

                console.log('Xu Ly SocKet Thanh Cong')

            }

        })

        socket.on('show_favorite', (data) => {

            if (data.id_user === sessionStorage.getItem('id_user')) {

                set_load_favorite(true)

                console.log('Xu Ly SocKet Thanh Cong')

            }

        })

    }, [])


    //----------------- Phần này dùng để tìm kiếm--------------------//

    // Hàm này dùng để hiện menu search
    const [keyword, set_keyword] = useState('')

    const handler_Search = (value) => {
        
        show_menu_search(value)

        console.log("Value: ", value)

        set_keyword(value)

    }

    const [show_search, set_show_search] = useState(false)

    function show_menu_search(value) {

        if (value !== '') {
            set_show_search(true)
        } else {
            set_show_search(false)
        }

    }
    // Hàm này dùng để hiện menu search

    const [list_search, set_list_search] = useState([])

    // Hàm này dễ gọi lại API phụ thuộc vào State keyword
    useEffect(() => {

        if (show_search){

            const fetchData = async () => {

                const params = {
                    keyword: keyword
                }

                const query = '?' + queryString.stringify(params)

                const response = await UsersAPI.search_Users(query)
                console.log(response)

                set_list_search(response)

            }

            fetchData()

        }

    }, [keyword])


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
                <Link className="navbar-brand font_title" to="/">Instagram</Link>

                <div className="navbar-collapse">
                    <div className="d-flex fix_navbar">
                        <Search handler_Search={handler_Search} />
                        {
                            show_search && (
                                <div className="drop_menu_search animate__animated animate__fadeIn">
                                    {
                                        list_search && list_search.map(value => (
                                            <Link to={`/account/${value._id}`} 
                                                className="d-flex pt-2 pb-2 pl-3 pr-3 link_search" 
                                                key={value._id}>
                                                <img src={value.image_profile} alt="" className="image_drop_tym" />
                                                <div className="mt-2 ml-3">
                                                    <span style={{ fontWeight: '600' }}>{value.username}</span>
                                                    <br />
                                                    <span style={{ color: 'gray' }}>{value.name}</span>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                    <ul className="navbar-nav">
                        <li className="li_profile">
                            <Link to='/'>
                                {active_profile === 'home' ? <i className="fa fa-desktop" style={{ fontSize: '25px', color: 'black' }}></i>
                                    : <i className="fa fa-television" style={{ fontSize: '25px', color: 'black' }}></i>
                                }
                            </Link>
                        </li>
                        <li className="li_profile">
                            <Link to='/chat'>
                                {active_profile === 'chat' ? <i className="fa fa-comment" style={{ fontSize: '25px', color: 'black' }}></i>
                                    : <i className="fa fa-comment-o" style={{ fontSize: '25px', color: 'black' }}></i>
                                }
                            </Link>
                        </li>
                        <li className="li_profile">
                            <div className="dropdown">
                                <a onClick={handler_Click_Tym}>
                                    <i
                                        className={tym ? 'fa fa-heart' : 'fa fa-heart-o'}
                                        style={{ fontSize: '25px', cursor: 'pointer' }}>
                                    </i>
                                    {
                                        count_favorite > 0 && <span className="span_drop_notification">{count_favorite}</span>
                                    }
                                </a>

                                {
                                    tym && (
                                        <div className="drop_menu_notice animate__animated animate__fadeInDown">
                                            {
                                                favorite && favorite.map(value => (
                                                    <Link to={`/post/${value.id_image_post}_${value.id_user}`} 
                                                        className="d-flex pt-2 pb-2 pl-3 pr-3 link_tym" key={value._id}>
                                                        <img src={value.image_profile} alt="" className="image_drop_tym" />
                                                        <span className="mt-3 ml-3" style={{ width: '90%', fontWeight: '600' }}>
                                                            {value.username_another} 
                                                            <i style={{ fontWeight: 'normal' }}>{value.category ? ' commented' : ' liked'} your post.</i>
                                                        </span>
                                                        <img src={value.image_body} alt="" className="image_drop_like" />
                                                    </Link>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </li>
                        <li className="li_profile">
                            <div className="dropdown">
                                <a onClick={handler_Click_Notice} className="a_drop_notification">
                                    <i
                                        className={notice ? 'fa fa-bell' : 'fa fa-bell-o'}
                                        style={{ fontSize: '25px', cursor: 'pointer' }}>
                                    </i>
                                    {
                                        count_notification > 0 && <span className="span_drop_notification">{count_notification}</span>
                                    }
                                </a>
                                {
                                    notice && (
                                        <div className='drop_menu_notice animate__animated animate__fadeInDown'>
                                            {
                                                notifications && notifications.map(value => (
                                                    <Link to={`/account/${value.id_user_another}`} 
                                                        className="d-flex pt-2 pb-2 pl-3 pr-3 link_notice" key={value._id}>
                                                        <img src={value.image_profile_another} alt="" className="image_drop_tym" />
                                                        <span className="mt-3 ml-3" style={{ width: '90%', fontWeight: '600', color: '#333333' }}>{value.username_another} <i style={{ fontWeight: 'normal' }}>has followed you.</i></span>
                                                    </Link>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </li>
                        <li className="li_profile">
                            <div className="dropdown show">
                                <img src={user.image_profile} alt="" className="img_profile dropdown-toggle" href="#" role="button"
                                    id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />

                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <Link style={{ textDecoration: 'none' }} to={`/account/${user._id}`}>
                                        <div className="dropdown-item d-flex p-2">
                                            <i className="fa fa-address-book-o" style={{ fontSize: '24px' }}></i>
                                            <span className="ml-3">Profile</span>
                                        </div>
                                    </Link>
                                    <Link style={{ textDecoration: 'none' }} to={`/account/${user._id}/setting`}>
                                        <div className="dropdown-item d-flex p-2">
                                            <i className="fa fa-cog" style={{ fontSize: '24px' }}></i>
                                            <span className="ml-3">Setting</span>
                                        </div>
                                    </Link>
                                    <div className="dropdown-item d-flex p-2" onClick={handlerLogout}>
                                        <i className="fa fa-power-off" style={{ fontSize: '24px' }}></i>
                                        <a className="ml-3">Log Out</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;