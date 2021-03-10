import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import avt from '../Image/test.jpg'
import avt2 from '../Image/avt.jpg'
import avt3 from '../Image/123.jpg'
import avt4 from '../Image/4.jpg'
import avt5 from '../Image/5.jpg'
import './Home.css'
import { Link } from 'react-router-dom';
import { storage } from '../Config/firebase'
import Users_Home from '../API/Users_Home';
import queryString from 'query-string'
import UsersAPI from '../API/UsersAPI';

Home.propTypes = {

};

function Home(props) {

    if (!sessionStorage.getItem('id_user')) {
        window.location.replace('/signin');
    }

    const [send, set_Send] = useState('')

    // Hiện Danh Sách Icon
    const [emotion, set_Emotion] = useState(false)

    const handlerEmotion = () => {
        set_Emotion(!emotion)
    }
    // Hiện Danh Sách Icon


    //Click vào từng icon nó sẽ nhận cái value truyền vào theo từng loại
    const onClickIcon = (value) => {
        set_Send(send + "" + value + " ")
    }
    //Click vào từng icon nó sẽ nhận cái value truyền vào theo từng loại


    // Hàm này dùng để nhận dữ liệu khi gõ phím
    const handlerSend = (e) => {
        set_Send(e.target.value)
    }


    // Hàm này dùng để hiện thị mở file vì input mình đã display none nó rồi
    const show_upload = () => {
        document.getElementById('file_upload_id').click();
    }


    const [image, set_image] = useState(null)


    // Hàm này dùng để show image lên html khi mà mình chọn mở file
    const handler_Change_Image = (e) => {
        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {

                var show_image = document.getElementById('show_image_status')

                show_image.setAttribute('src', e.target.result)

            };

            reader.readAsDataURL(e.target.files[0]);

            set_image(e.target.files[0])

        }

        document.getElementById('group_get_image').setAttribute('style', 'display: block')
    }


    // Hàm này dùng để upload file lên firebase
    const handler_post_status = () => {

        // Dòng này dùng để upload
        const uploadTask = storage.ref(`social/${image.name}`).put(image)
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error)
            },
            async () => { // Phần này dùng để lấy url
                await storage
                    .ref("social")
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        // Bắt đầu gọi API để xử lý dữ liệu dưới database
                        const post_status_data = async () => {

                            const params = {
                                id_user: sessionStorage.getItem('id_user'),
                                title: send,
                                image_body: url
                            }

                            const query = '?' + queryString.stringify(params)

                            await Users_Home.post_Status_User(query)

                        }

                        post_status_data()

                        set_Send('')

                        set_reload(true) // Thay đổi state để gọi là hàm useEffect

                    })
            }
        )

        alert("Image Upload")

        document.getElementById('group_get_image').setAttribute('style', 'display: none')

    }


    // -----------------------PHAN HOME-----------------------------//

    const [list_post_home, set_list_post_home] = useState([])

    const [reload, set_reload] = useState(true)

    // Hàm này dùng để load bài viết ở trang home phụ thuộc vào state reload
    useEffect(() => {

        if (reload) {

            const fetchData = async () => {

                const params = {
                    id_user: sessionStorage.getItem('id_user')
                }

                const query = '?' + queryString.stringify(params)

                const response = await Users_Home.get_Users_Home(query)

                const reverse_data = response.reverse() // Đảo ngược dữ liệu lên trên đầu

                random_status_home(reverse_data)

                set_list_post_home(reverse_data)

            }

            fetchData()

            set_reload(false)

        }

    }, [reload])


    // Hàm này dùng để render dữ liệu random ra trang home
    // tối da 10 bài viết
    function random_status_home(data) {

        let array_new = []

        if (data.length < 10) {
            array_new = [...data]
        } else {

            for (let i = 0; i < 10; i++) {

                let random = Math.floor(Math.random() * data.length) + 0;

                array_new.push(data[random])

            }

        }

        return array_new

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


    // ------- Phần này dùng để lấy toàn bộ user
    const [user_all, set_user_all] = useState([])

    useEffect(() => {

        const fetchData = async () => {

            const response = await UsersAPI.getAll()
            console.log(response)

            // Sau đó lọc ra những user khác với user đang đăng nhập
            const filter_Users = response.filter(value => {
                return value._id !== sessionStorage.getItem('id_user')
            })

            // Tiếp theo là cắt user lấy 5 user
            set_user_all(filter_Users.splice(0, 5))

        }

        fetchData()

    }, [sessionStorage.getItem('id_user')])
    // ------- Phần này dùng để lấy toàn bộ user



    return (
        <div className="container mt-5 pt-5">
            <div className="row">
                <div className="col-sm-8">
                    <div className="content_home">
                        <div className="box_status d-flex">
                            <img className="img_status" src={user.image_profile} alt="" />
                            <a className="a_status" data-toggle="modal" data-target="#exampleModalLong">Bạn đang nghĩ cái gì thế!</a>

                            <div className="modal fade mt-5" id="exampleModalLong" tabIndex="-1" role="dialog" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Tạo Bài Viết</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="sub_header d-flex">
                                                <img src={avt} alt="" />
                                                <a className="a_sub_header mt-2">Tiền Kim</a>
                                            </div>
                                            <div className="sub_body mt-2">
                                                <textarea value={send} onChange={handlerSend} className="txt_area_sub" rows="2" placeholder="Bạn đang nghĩ gì?"></textarea>
                                                <div className="group_scroll" id="group_get_image" style={{ display: 'none' }}>
                                                    <div className="get_image">
                                                        <img className="img_sub_body" id="show_image_status" />
                                                    </div>
                                                </div>
                                                {
                                                    emotion && (<div className="show_icon">
                                                        <div className="list_icon">
                                                            <div className="icon" onClick={() => onClickIcon(":(")}>
                                                                <img className="img_icon" src="https://www.flaticon.com/svg/static/icons/svg/742/742760.svg" alt="" />
                                                            </div>
                                                            <div className="icon" onClick={() => onClickIcon("*_*")}>
                                                                <img className="img_icon" src="https://www.flaticon.com/svg/static/icons/svg/742/742750.svg" alt="" />
                                                            </div>
                                                            <div className="icon" onClick={() => onClickIcon(":)")}>
                                                                <img className="img_icon" src="https://www.flaticon.com/svg/static/icons/svg/742/742920.svg" alt="" />
                                                            </div>
                                                            <div className="icon" onClick={() => onClickIcon("T_T")}>
                                                                <img className="img_icon" src="https://www.flaticon.com/svg/static/icons/svg/742/742822.svg" alt="" />
                                                            </div>
                                                            <div className="icon" onClick={() => onClickIcon("-,-")}>
                                                                <img className="img_icon" src="https://www.flaticon.com/svg/static/icons/svg/742/742787.svg" alt="" />
                                                            </div>
                                                            <div className="icon" onClick={() => onClickIcon(":9")}>
                                                                <img className="img_icon" src="https://www.flaticon.com/svg/static/icons/svg/725/725107.svg" alt="" />
                                                            </div>
                                                            <div className="icon" onClick={() => onClickIcon(":4")}>
                                                                <img className="img_icon" src="https://www.flaticon.com/svg/static/icons/svg/743/743217.svg" alt="" />
                                                            </div>
                                                            <div className="icon" onClick={() => onClickIcon(":")}>
                                                                <img className="img_icon" src="https://www.flaticon.com/svg/static/icons/svg/743/743255.svg" alt="" />
                                                            </div>
                                                            <div className="icon" onClick={() => onClickIcon("<3")}>
                                                                <img className="img_icon" src="https://www.flaticon.com/svg/static/icons/svg/1933/1933691.svg" alt="" />
                                                            </div>
                                                            <div className="icon" onClick={() => onClickIcon(").")}>
                                                                <img className="img_icon" src="https://www.flaticon.com/svg/static/icons/svg/1933/1933833.svg" alt="" />
                                                            </div>
                                                            <div className="icon" onClick={() => onClickIcon(":z")}>
                                                                <img className="img_icon" src="https://www.flaticon.com/svg/static/icons/svg/1933/1933642.svg" alt="" />
                                                            </div>
                                                            <div className="icon" onClick={() => onClickIcon(":8")}>
                                                                <img className="img_icon" src="https://www.flaticon.com/svg/static/icons/svg/1933/1933179.svg" alt="" />
                                                            </div>
                                                        </div>
                                                    </div>)
                                                }
                                                <div className="d-flex justify-content-between">
                                                    <input type="file" onChange={handler_Change_Image} id="file_upload_id" style={{ display: 'none' }} />
                                                    <i className="fa fa-file-image-o fix_icon" onClick={show_upload} style={{ cursor: 'pointer', fontSize: '24px', color: '#41B35D' }}></i>
                                                    <i className="fa fa-smile-o fa-2x fix_icon2" onClick={handlerEmotion} style={{ cursor: 'pointer', color: '#FFD54F' }}></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-primary btn_sub_footer" onClick={handler_post_status}>Đăng</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="box_poster_user">
                            {
                                list_post_home && list_post_home.map(value => (
                                    <div className="box_poster_another mt-4 mb-4" key={value._id}>
                                        <div className="post_header d-flex p-3">
                                            <img src={value.image_profile_following} alt="" className="image_post_header" />
                                            <span className="span_post_header">{value.username_following}</span>
                                        </div>
                                        <div className="post_body">
                                            <img src={value.image_body}
                                                className="image_post_body" />
                                            <div className="action_post_body d-flex justify-content-between">
                                                <div className="left_action p-3">
                                                    <i className="fa fa-heart-o" style={{ fontSize: '30px', cursor: 'pointer' }}></i>
                                                    <i className="fa fa-comment-o ml-3" style={{ fontSize: '30px', cursor: 'pointer' }}></i>
                                                    <i className="fa fa-send-o ml-3" style={{ fontSize: '30px', cursor: 'pointer' }}></i>
                                                </div>
                                                <div className="right_action p-3">
                                                    <i className="fa fa-star-o" style={{ fontSize: '30px', cursor: 'pointer' }}></i>
                                                </div>
                                            </div>
                                            <span className="ml-3" style={{ fontWeight: '600', fontSize: '1rem' }}>Liked by <i style={{ cursor: 'pointer' }}>{value.like} others</i></span>

                                            <div className="caption_user mt-2">
                                                <span className="ml-3" style={{ fontWeight: '600', fontSize: '1rem' }}>{value.username_following}</span> &nbsp;
                                            <span>{value.title}</span>
                                            </div>
                                            <Link className="ml-3" style={{ color: 'gray' }} to="/">View all {value.comment} comment</Link>
                                        </div>
                                        <hr />
                                        <div className="post_footer d-flex pl-3 pr-3 pb-3">
                                            <i className="fa fa-smile-o fa-2x icon_footer" style={{ cursor: 'pointer' }}></i>
                                            <input className="input_footer ml-3" type="text" placeholder="Add a comment" />
                                            <a className="send_footer ml-3 mt-1">Post</a>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="user_home">
                        <div className="group_user_home mt-3 p-2">
                            <div className="box_user_me d-flex">
                                <Link to={`/account/${user._id}`}>
                                    <img className="image_user_me" src={user.image_profile} alt="" />
                                </Link>
                                <div className="title_user_me d-flex justify-content-between ml-3">
                                    <div className="name_user_me">
                                        <div style={{ fontWeight: '600' }}>{user.username}</div>
                                        <div style={{ color: 'gray' }}>{user.name}</div>
                                    </div>
                                    <span className="switch_me mt-3" style={{ color: '#33AAF7', fontWeight: 600, fontSize: '.9rem' }}>Switch</span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mt-4">
                                <a style={{ color: 'gray' }}>Suggestions For You</a>
                                <a href="#" style={{ color: 'black', fontSize: '.85rem', fontWeight: '600' }}>See All</a>
                            </div>
                            <div className="mt-2">
                                {
                                    user_all && user_all.map(value => (
                                        <div className="box_user_another d-flex mt-2" key={value._id}>
                                            <Link to={`/account/${value._id}`}>
                                                <img src={value.image_profile} alt="" className="image_user_another mt-2" />
                                            </Link>
                                            <div className="title_user_me d-flex justify-content-between ml-3">
                                                <div>
                                                    <Link to={`/account/${value._id}`} style={{ textDecoration: 'none'}}>
                                                        <span style={{ fontWeight: '600', fontSize: '.85rem', cursor: 'pointer', color: 'black' }}>{value.username}</span>
                                                    </Link>
                                                    <br />
                                                    <span style={{ color: 'gray', fontSize: '.85rem', cursor: 'pointer' }}>{value.name}</span>
                                                </div>
                                                <span className="mt-3" style={{ color: '#33AAF7', fontWeight: 600, fontSize: '.9rem' }}>Add</span>
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;