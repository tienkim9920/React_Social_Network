import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './DetailUser.css'
import avt1 from '../../Image/5.jpg'
import { Link, useParams } from 'react-router-dom';
import UsersAPI from '../../API/UsersAPI';

DetailUser.propTypes = {

};

function DetailUser(props) {

    // Lấy id params
    const { id } = useParams()

    // ------- Phần này dùng để lấy dữ liệu của chính user
    const [user, set_user] = useState({})

    useEffect(() => {

        const fetchData = async () => {

            const response = await UsersAPI.getId(id)
            console.log(response)

            set_user(response)

        }

        fetchData()

    }, [id])
    // ------- Phần này dùng để lấy dữ liệu của chính user


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
                            { sessionStorage.getItem('id_user') === id ? 
                                (<a className="a_edit_profile">Edit Profile</a>) : 
                                    <a className="a_edit_profile btn_follow_profile">Follow</a>}
                        </div>
                        <div className="mt-3 mb-2">
                            <span><i style={{ fontWeight: '600' }}>13</i> Post</span>
                            <span className="ml-4"><i style={{ fontWeight: '600' }}>418</i> Followers</span>
                            <span className="ml-4"><i style={{ fontWeight: '600' }}>96</i> Following</span>
                        </div>
                        <div>
                            <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>{user.name}</span>
                        </div>
                        <div>
                            <a href="#" style={{ fontWeight: '600' }} >{user.website}</a>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="post_image_personal">
                    <div className="group_grid_image_personal">
                        <div className="p-3">
                            <Link><img src={avt1} alt="" className="image_personal_all" /></Link>
                        </div>
                        <div className="p-3">
                            <Link><img src={avt1} alt="" className="image_personal_all" /></Link>
                        </div>
                        <div className="p-3">
                            <Link><img src={avt1} alt="" className="image_personal_all" /></Link>
                        </div>
                        <div className="p-3">
                            <Link><img src={avt1} alt="" className="image_personal_all" /></Link>
                        </div>
                        <div className="p-3">
                            <Link><img src={avt1} alt="" className="image_personal_all" /></Link>
                        </div>
                    </div>
                </div>
                <div className="text-center pt-4 pb-4" style={{ color: 'gray' }}>© 2021 Instagram by TienKim Developer</div>
            </div>
        </div>
    );
}

export default DetailUser;