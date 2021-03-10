import React from 'react';
import PropTypes from 'prop-types';
import './DetailPost.css'
import avt from '../../Image/5.jpg'

function DetailPost(props) {
    return (
        <div className="container mt-5 pt-4">
            <div className="group_detail_post">
                <div className="group_image_detail_post">
                    <img src={avt} alt="" className="image_detail_post" />
                </div>
                <div className="group_content_detail_post">
                    <div className="header_detail_post pt-3 pl-3">
                        <img src={avt} alt="" className="image_header_detail_post" />
                        <span className="ml-3" style={{ fontWeight: '600' }}>nkt.9920</span>
                    </div>
                    <hr />
                    <div className="body_detail_post pt-1 pl-3">
                        <div className="detail_comment_post pb-3">
                            <img src={avt} alt="" className="image_header_detail_post" />
                            <span className="ml-3" style={{ fontWeight: '600' }}>nkt.9920</span>
                            &nbsp;
                            <span style={{ fontSize: '1rem' }}>Hello</span>
                        </div>
                        <div className="detail_comment_post pb-3">
                            <img src={avt} alt="" className="image_header_detail_post" />
                            <span className="ml-3" style={{ fontWeight: '600' }}>nkt.9920</span>
                            &nbsp;
                            <span style={{ fontSize: '1rem' }}>Hello</span>
                        </div>
                        <div className="detail_comment_post pb-3">
                            <img src={avt} alt="" className="image_header_detail_post" />
                            <span className="ml-3" style={{ fontWeight: '600' }}>nkt.9920</span>
                            &nbsp;
                            <span style={{ fontSize: '1rem' }}>Hello</span>
                        </div>
                        <div className="detail_comment_post pb-3">
                            <img src={avt} alt="" className="image_header_detail_post" />
                            <span className="ml-3" style={{ fontWeight: '600' }}>nkt.9920</span>
                            &nbsp;
                            <span style={{ fontSize: '1rem' }}>Hello</span>
                        </div>
                        <div className="detail_comment_post pb-3">
                            <img src={avt} alt="" className="image_header_detail_post" />
                            <span className="ml-3" style={{ fontWeight: '600' }}>nkt.9920</span>
                            &nbsp;
                            <span style={{ fontSize: '1rem' }}>Hello</span>
                        </div>
                        <div className="detail_comment_post pb-3">
                            <img src={avt} alt="" className="image_header_detail_post" />
                            <span className="ml-3" style={{ fontWeight: '600' }}>nkt.9920</span>
                            &nbsp;
                            <span style={{ fontSize: '1rem' }}>Hello</span>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <div className="action_post_body d-flex justify-content-between">
                            <div className="left_action pl-3">
                                <i className="fa fa-heart-o" style={{ fontSize: '30px', cursor: 'pointer' }}></i>
                                <i className="fa fa-comment-o ml-3" style={{ fontSize: '30px', cursor: 'pointer' }}></i>
                                <i className="fa fa-send-o ml-3" style={{ fontSize: '30px', cursor: 'pointer' }}></i>
                            </div>
                            <div className="right_action pr-3">
                                <i className="fa fa-star-o" style={{ fontSize: '30px', cursor: 'pointer' }}></i>
                            </div>
                        </div>
                        <span className="ml-3" style={{ fontWeight: '600' }}>170 like</span>
                    </div>
                    <hr />
                    <div className="post_footer d-flex pl-3 pr-3 pb-3">
                        <i className="fa fa-smile-o fa-2x icon_footer" style={{ cursor: 'pointer' }}></i>
                        <input className="input_footer ml-3" type="text" placeholder="Add a comment" />
                        <a className="send_footer ml-3 mt-1" style={{ cursor: 'pointer' }}>Post</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailPost;