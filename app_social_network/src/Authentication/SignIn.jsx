import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Auth.css'
import { Link, Redirect } from 'react-router-dom';
import queryString from 'query-string'
import UsersAPI from '../API/UsersAPI';
import { useDispatch } from 'react-redux';
import { addSession } from '../Redux/Action/ActionSession';
import alertify from 'alertifyjs'

SignIn.propTypes = {
    
};

function SignIn(props) {

    const [password, set_password] = useState('')
    const [phone, set_phone] = useState('')

    const [redirect, set_redirect] = useState(false)

    const dispatch = useDispatch()

    const [isCheck, set_isCheck] = useState(false)

    const handlerSubmit = () => {

        const postSignIn = async () => {

            const params = {
                phone: phone,
                password: password
            }

            const query = '?' + queryString.stringify(params)

            const response = await UsersAPI.postSignIn(query)

            if (response !== 'That bai'){
                set_isCheck(true)

                // Lưu vào session id_user
                sessionStorage.setItem('id_user', response)

                // Thay đổi redux
                const action = addSession(response)
                dispatch(action)

                console.log("Login Success!")

                // Thay đổi state để redirect
                set_redirect(true)
            }

        }

        postSignIn()

    }

    const onChangePhone = (e) => {
        set_phone(e.target.value)
    }

    const onChangePassword = (e) => {
        set_password(e.target.value)
    }

    return (
        <div className="container d-flex justify-content-center">
            <div>
                <div className="group_authentication">
                    <h1 className="header_authentication font_title text-center">
                        Instagram
                    </h1>
                    <div className="body_authentication">
                        <div className="d-flex justify-content-center">
                            <input className="txt_authentication" type="text" onChange={onChangePhone} value={phone} placeholder="Phone Number"/>
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                            <input className="txt_authentication" type="password" onChange={onChangePassword} value={password} placeholder="Password"/>
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                            {
                                redirect && <Redirect to='/' />
                            }
                            <button className="btn btn-primary btn_authentication" onClick={handlerSubmit}>Log In</button>
                        </div>
                        <hr className="hr_authentication" />
                        <div className="d-flex justify-content-center">
                            <a href="#">Login With Google</a>
                        </div>
                        <div className="d-flex justify-content-center mt-2 pb-3">
                            <a href="#" style={{ fontSize: '.9rem'}}>Forget Password?</a>
                        </div>
                    </div>
                </div>
                <div className="auth_sub">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </div>
    );
}

export default SignIn;