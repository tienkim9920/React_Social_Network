import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Header.css'
import avatar from '../Image/test.jpg'
import avatar2 from '../Image/4.jpg'
import avatar3 from '../Image/5.jpg'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { deleteSession } from '../Redux/Action/ActionSession';
import UsersAPI from '../API/UsersAPI';

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
    }


    // Hàm này dùng để hiện thông báo active notice
    const [notice, set_notice] = useState(false)

    const handler_Click_Notice = () => {
        set_notice(!notice)
        console.log(notice)
    }


    // Hàm này dùng để hiện menu search
    const [search, set_search] = useState('')

    const handler_Search = (e) => {
        set_search(e.target.value)

        show_menu_search(e.target.value)
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
            console.log(response)

            set_user(response)

        }

        fetchData()

    }, [sessionStorage.getItem('id_user')])
    // ------- Phần này dùng để lấy dữ liệu của chính user

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
                <Link className="navbar-brand font_title" to="/">Instagram</Link>

                <div className="navbar-collapse">
                    <div className="d-flex fix_navbar">
                        <div className="group_search">
                            <input className="txt_search" type="text" placeholder="Search..." value={search} onChange={handler_Search} />
                            <i className="fa fa-search fix_icon_search"></i>
                        </div>
                        {
                            show_search && (
                                <div className="drop_menu_search animate__animated animate__fadeIn">
                                    <div className="d-flex pt-2 pb-2 pl-3 pr-3">
                                        <img src={avatar2} alt="" className="image_drop_tym" />
                                        <div className="mt-2 ml-3">
                                            <span style={{ fontWeight: '600' }}>hieuluong.1101</span>
                                            <br/>
                                            <span style={{ color: 'gray' }}>Hiếu Lương</span>
                                        </div>
                                    </div>
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
                                </a>

                                {
                                    tym && (
                                        <div className="drop_menu_notice animate__animated animate__fadeInDown">
                                            <div className="d-flex pt-2 pb-2 pl-3 pr-3">
                                                <img src={avatar2} alt="" className="image_drop_tym" />
                                                <span className="mt-2 ml-3" style={{ width: '90%', fontWeight: '600' }}>hieuluong.1101 <i style={{ fontWeight: 'normal' }}>liked your post.</i></span>
                                                <img src={avatar3} alt="" className="image_drop_like" />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </li>
                        <li className="li_profile">
                            <div className="dropdown">
                                <a onClick={handler_Click_Notice}>
                                    <i
                                        className={notice ? 'fa fa-bell' : 'fa fa-bell-o'}
                                        style={{ fontSize: '25px', cursor: 'pointer' }}>
                                    </i>
                                </a>
                                {
                                    notice && (
                                        <div className='drop_menu_notice animate__animated animate__fadeInDown'>
                                            <div className="d-flex pt-2 pb-2 pl-3 pr-3">
                                                <img src={avatar2} alt="" className="image_drop_tym" />
                                                <span className="mt-3 ml-3" style={{ width: '90%', fontWeight: '600' }}>hieuluong.1101 <i style={{ fontWeight: 'normal' }}>add friend.</i></span>
                                                <a className="a_deny">Deny</a>
                                                &nbsp;
                                                <a className="a_accept">Accept</a>
                                            </div>
                                            <div className="d-flex pt-2 pb-2 pl-3 pr-3">
                                                <img src={avatar2} alt="" className="image_drop_tym" />
                                                <span className="mt-3 ml-3" style={{ width: '90%', fontWeight: '600' }}>hieuluong.1101 <i style={{ fontWeight: 'normal' }}>add friend.</i></span>
                                                <a className="a_deny">Deny</a>
                                                &nbsp;
                                                <a className="a_accept">Accept</a>
                                            </div>

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
                                    <Link style={{ textDecoration: 'none'}} to={`/account/${user._id}`}>
                                        <div className="dropdown-item d-flex p-2">
                                            <i className="fa fa-address-book-o" style={{ fontSize: '24px' }}></i>
                                            <span className="ml-3">Profile</span>
                                        </div>
                                    </Link>
                                    <div className="dropdown-item d-flex p-2">
                                        <i className="fa fa-cog" style={{ fontSize: '24px' }}></i>
                                        <a className="ml-3">Setting</a>
                                    </div>
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