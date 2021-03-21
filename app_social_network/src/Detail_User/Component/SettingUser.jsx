import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import avt1 from '../../Image/4.jpg'
import UsersAPI from '../../API/UsersAPI';
import queryString from 'query-string'
import { storage } from '../../Config/firebase';

SettingUser.propTypes = {

};

function SettingUser(props) {

    // Hàm này dùng để render html cho từng loại edit profile hoặc change password
    // Tùy theo người dùng chọn
    const [edit_status, set_edit_status] = useState('edit_profile')

    const handler_Status = (value) => {

        set_edit_status(value)

    }

    const [reload, set_reload] = useState(true)

    // Hàm này dùng để thay đổi ảnh đại diện (change profile photo)
    const handler_Upload_Image = (e) => {

        // Dòng này dùng để upload
        const uploadTask = storage.ref(`social/${e.target.files[0].name}`).put(e.target.files[0])
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error)
            },
            async () => { // Phần này dùng để lấy url
                await storage
                    .ref("social")
                    .child(e.target.files[0].name)
                    .getDownloadURL()
                    .then((url) => {
                        // Bắt đầu gọi API để xử lý dữ liệu dưới database
                        const post_status_data = async () => {

                            const params = {
                                id_user: sessionStorage.getItem('id_user'),
                                image_profile: url
                            }

                            const query = '?' + queryString.stringify(params)

                            await UsersAPI.change_avatar(query)

                        }

                        post_status_data()

                    })
            }
        )

        alert("Image Change Success!")

        set_reload(true) // Thay đổi state để gọi là hàm useEffect

    }

    const show_upload = () => {
        document.getElementById('file_upload_user').click()
    }

    
    const [user, set_user] = useState({})

    useEffect(() => {

        if (reload){
            const fetchData = async () => {

                const response = await UsersAPI.getId(sessionStorage.getItem('id_user'))
    
                set_user(response)
    
                set_name(response.name)
                set_username(response.username)
                set_website(response.website)
                set_email(response.email)
                set_phone(response.phone)
                set_password(response.password)
    
            }
    
            fetchData()

            set_reload(false)
        }

    }, [reload])


    const [name, set_name] = useState('')
    const [username, set_username] = useState('')
    const [website, set_website] = useState('')
    const [email, set_email] = useState('')
    const [phone, set_phone] = useState('')
    const [password, set_password] = useState('')
    const [new_password, set_new_password] = useState('')
    const [compare_password, set_compare_password] = useState('')

    const handler_Update = () => {

        const fetchData = async () => {

            const params = {
                id_user: sessionStorage.getItem('id_user'),
                name: name,
                username: username,
                website: website,
                email: email,
                phone: phone
            }

            const query = '?' + queryString.stringify(params)

            const response = await UsersAPI.update_info(query)

            alert("Bạn Đã Thay Đổi Thành Công!")

        }

        fetchData()

    }


    const handler_ChangePass = () => {

        if (new_password !== compare_password){
            alert("Mật Khẩu Mới Không Giống Nhau!")
            return
        }else{

            const fetchData = async () => {

                const params = {
                    id_user: sessionStorage.getItem('id_user'),
                    password: new_password
                }

                const query = '?' + queryString.stringify(params)

                const response = await UsersAPI.change_password(query)

                alert("Bạn Đã Thay Đổi Mật Khẩu Thành Công!")

                set_compare_password('')

                set_password('')

                set_new_password('')

            }

            fetchData()

        }

    }


    return (
        <div className="container mt-5 pt-4">
            <div className="group_profile">
                <div className="group_setting mt-3">
                    <div className="setting_left">
                        <div className={edit_status === 'edit_profile' ? 'setting_item setting_item_active' : 'setting_item'}
                            onClick={() => handler_Status('edit_profile')}>

                            <a className={edit_status === 'edit_profile' ? 'a_setting_active' : ''}
                                style={{ fontSize: '1.1rem' }}>Edit Profile</a>

                        </div>

                        <div className={edit_status === 'change_password' ? 'setting_item setting_item_active' : 'setting_item'}
                            onClick={() => handler_Status('change_password')}>

                            <a className={edit_status === 'change_password' ? 'a_setting_active' : ''}
                                style={{ fontSize: '1.1rem' }}>Change Password</a>

                        </div>
                    </div>
                    <div className="setting_right">
                        {
                            edit_status === 'edit_profile' ? (
                                <div className="setting_edit_profile">
                                    <div className="header_setting_edit d-flex justify-content-center pt-4 pb-4">
                                        <div className="d-flex">
                                            <img src={user.image_profile} alt="" className="image_header_setting_edit" />
                                            <div className="ml-4">
                                                <span style={{ fontWeight: '600', fontSize: '1.2rem' }}>{user.username}</span>
                                                <br />
                                                <a href="#" data-toggle="modal" data-target="#exampleModal">
                                                    Change Profile Photo</a>

                                                <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="exampleModalLabel">Change Profile Photo</h5>
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body text-center">
                                                                <input type="file" onChange={handler_Upload_Image} id="file_upload_user" style={{ display: 'none' }} />
                                                                <a href="#" onClick={show_upload}
                                                                    style={{ textDecoration: 'none', fontWeight: '600' }} >Upload Photo</a>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="txt_setting_edit pt-3 pb-2">
                                        <div className="d-flex justify-content-center">
                                            <span style={{ fontWeight: '600' }}>Name</span>
                                        </div>
                                        <div>
                                            <input className="txt_input_edit" type="text" value={name} 
                                            onChange={(e) => set_name(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="txt_setting_edit pt-3 pb-2">
                                        <div className="d-flex justify-content-center">
                                            <span style={{ fontWeight: '600' }}>Username</span>
                                        </div>
                                        <div>
                                            <input className="txt_input_edit" type="text" value={username}
                                            onChange={(e) => set_username(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="txt_setting_edit pt-3 pb-2">
                                        <div className="d-flex justify-content-center">
                                            <span style={{ fontWeight: '600' }}>Website</span>
                                        </div>
                                        <div>
                                            <input className="txt_input_edit" type="text" value={website}
                                            onChange={(e) => set_website(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="txt_setting_edit pt-3 pb-2">
                                        <div className="d-flex justify-content-center">
                                            <span style={{ fontWeight: '600' }}>Email</span>
                                        </div>
                                        <div>
                                            <input className="txt_input_edit" type="text" value={email}
                                            onChange={(e) => set_email(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="txt_setting_edit pt-3 pb-2">
                                        <div className="d-flex justify-content-center">
                                            <span style={{ fontWeight: '600' }}>Phone Number</span>
                                        </div>
                                        <div>
                                            <input className="txt_input_edit" type="text" value={phone}
                                            onChange={(e) => set_phone(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center pt-3 pb-4">
                                        <button className="btn btn-primary" onClick={handler_Update}>Submit</button>
                                    </div>
                                </div>
                            ) : (
                                    <div className="setting_change_password">
                                        <div className="header_setting_edit d-flex justify-content-center pt-4 pb-4">
                                            <div className="d-flex">
                                                <img src={user.image_profile} alt="" className="image_header_setting_edit" />
                                                <div className="ml-4 mt-2">
                                                    <span style={{ fontWeight: '600', fontSize: '1.2rem' }}>nkt.9920</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="txt_setting_edit pt-3 pb-2">
                                            <div className="d-flex justify-content-center">
                                                <span style={{ fontWeight: '600' }}>Old Password</span>
                                            </div>
                                            <div>
                                                <input className="txt_input_edit" type="password" value={password}
                                                onChange={(e) => set_password(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="txt_setting_edit pt-3 pb-2">
                                            <div className="d-flex justify-content-center">
                                                <span style={{ fontWeight: '600' }} >New Password</span>
                                            </div>
                                            <div>
                                                <input className="txt_input_edit" type="password" value={new_password}
                                                onChange={(e) => set_new_password(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="txt_setting_edit pt-3 pb-2">
                                            <div className="d-flex justify-content-center">
                                                <span style={{ fontWeight: '600' }}>Confirm New Password</span>
                                            </div>
                                            <div>
                                                <input className="txt_input_edit" type="password" value={compare_password}
                                                onChange={(e) => set_compare_password(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center pt-3 pb-4">
                                            <button className="btn btn-primary" onClick={handler_ChangePass}>Change Password</button>
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingUser;