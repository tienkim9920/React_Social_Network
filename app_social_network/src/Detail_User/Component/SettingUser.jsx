import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import avt1 from '../../Image/4.jpg'

SettingUser.propTypes = {

};

function SettingUser(props) {

    // Hàm này dùng để render html cho từng loại edit profile hoặc change password
    // Tùy theo người dùng chọn
    const [edit_status, set_edit_status] = useState('edit_profile')

    const handler_Status = (value) => {

        set_edit_status(value)

    }


    // Hàm này dùng để thay đổi ảnh đại diện (change profile photo)
    const handler_Upload_Image = () => {

    }

    const show_upload = () => {
        document.getElementById('file_upload_user').click()
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
                                            <img src={avt1} alt="" className="image_header_setting_edit" />
                                            <div className="ml-4">
                                                <span style={{ fontWeight: '600', fontSize: '1.2rem' }}>nkt.9920</span>
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
                                            <input className="txt_input_edit" type="text" />
                                        </div>
                                    </div>
                                    <div className="txt_setting_edit pt-3 pb-2">
                                        <div className="d-flex justify-content-center">
                                            <span style={{ fontWeight: '600' }}>Username</span>
                                        </div>
                                        <div>
                                            <input className="txt_input_edit" type="text" />
                                        </div>
                                    </div>
                                    <div className="txt_setting_edit pt-3 pb-2">
                                        <div className="d-flex justify-content-center">
                                            <span style={{ fontWeight: '600' }}>Website</span>
                                        </div>
                                        <div>
                                            <input className="txt_input_edit" type="text" />
                                        </div>
                                    </div>
                                    <div className="txt_setting_edit pt-3 pb-2">
                                        <div className="d-flex justify-content-center">
                                            <span style={{ fontWeight: '600' }}>Email</span>
                                        </div>
                                        <div>
                                            <input className="txt_input_edit" type="text" />
                                        </div>
                                    </div>
                                    <div className="txt_setting_edit pt-3 pb-2">
                                        <div className="d-flex justify-content-center">
                                            <span style={{ fontWeight: '600' }}>Phone Number</span>
                                        </div>
                                        <div>
                                            <input className="txt_input_edit" type="text" />
                                        </div>
                                    </div>
                                    <div className="txt_setting_edit pt-3 pb-2">
                                        <div className="d-flex justify-content-center">
                                            <span style={{ fontWeight: '600' }}>Address</span>
                                        </div>
                                        <div>
                                            <input className="txt_input_edit" type="text" />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center pt-3 pb-4">
                                        <button className="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            ) : (
                                    <div className="setting_change_password">
                                        <div className="header_setting_edit d-flex justify-content-center pt-4 pb-4">
                                            <div className="d-flex">
                                                <img src={avt1} alt="" className="image_header_setting_edit" />
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
                                                <input className="txt_input_edit" type="text" />
                                            </div>
                                        </div>
                                        <div className="txt_setting_edit pt-3 pb-2">
                                            <div className="d-flex justify-content-center">
                                                <span style={{ fontWeight: '600' }}>New Password</span>
                                            </div>
                                            <div>
                                                <input className="txt_input_edit" type="text" />
                                            </div>
                                        </div>
                                        <div className="txt_setting_edit pt-3 pb-2">
                                            <div className="d-flex justify-content-center">
                                                <span style={{ fontWeight: '600' }}>Confirm New Password</span>
                                            </div>
                                            <div>
                                                <input className="txt_input_edit" type="text" />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center pt-3 pb-4">
                                            <button className="btn btn-primary">Change Password</button>
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