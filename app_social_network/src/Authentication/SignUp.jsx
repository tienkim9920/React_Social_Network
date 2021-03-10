import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Auth.css'
import { Link } from 'react-router-dom';
import queryString from 'query-string'
import alertify from 'alertifyjs'
import UsersAPI from '../API/UsersAPI';

SignUp.propTypes = {

};

function SignUp(props) {

    const [phone, set_phone] = useState('')
    const [name, set_name] = useState('')
    const [username, set_username] = useState('')
    const [password, set_password] = useState('')

    const handlerSubmit = () => {

        if (!phone){
            alertify.set('notifier','position', 'top-right')
            alertify.error('You have been sign up fail!')
            return
        }

        if (!name){
            alertify.set('notifier','position', 'top-right')
            alertify.error('You have been sign up fail!')
            return
        }

        if (!username){
            alertify.set('notifier','position', 'top-right')
            alertify.error('You have been sign up v!')
            return
        }

        if (!password){
            alertify.set('notifier','position', 'top-right')
            alertify.error('You have been sign up fail!')
            return
        }

        const postSignUp = async () => {

            const params = {
                phone,
                name,
                username,
                password
            }

            const query = '?' + queryString.stringify(params)

            const response = await UsersAPI.postSignUp(query)

        }

        postSignUp()

        alertify.set('notifier','position', 'top-right')
        alertify.success('You have been sign up success!')

        set_phone('')
        set_name('')
        set_username('')
        set_password('')

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
                            <input className="txt_authentication" type="text" onChange={(e) => set_phone(e.target.value)} value={phone} placeholder="Phone Number" />
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                            <input className="txt_authentication" type="text" onChange={(e) => set_name(e.target.value)} value={name} placeholder="Full Name" />
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                            <input className="txt_authentication" type="text" onChange={(e) => set_username(e.target.value)} value={username} placeholder="Username" />
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                            <input className="txt_authentication" type="password" onChange={(e) => set_password(e.target.value)} value={password} placeholder="Password" />
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                            <button className="btn btn-primary btn_authentication" onClick={handlerSubmit}>Sign Up</button>
                        </div>
                        <hr className="hr_authentication" />
                        <div className="d-flex justify-content-center">
                            <a href="#">Login With Google</a>
                        </div>
                        <div className="d-flex justify-content-center mt-2 pb-3">
                            <a href="#" style={{ fontSize: '.9rem' }}>Forget Password?</a>
                        </div>
                    </div>
                </div>
                <div className="auth_sub">
                    Have a account? <Link to="/signin">Sign In</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;