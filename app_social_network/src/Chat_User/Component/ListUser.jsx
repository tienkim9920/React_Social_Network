import React from 'react';
import PropTypes from 'prop-types';
import avt from '../../Image/test.jpg'


function ListUser(props) {



    return (
        <div>
            <div className="row sideBar-body">
                <div className="col-sm-3 col-xs-3 sideBar-avatar">
                    <div className="avatar-icon">
                        <img src={avt} />
                    </div>
                </div>
                <div className="col-sm-9 col-xs-9 sideBar-main">
                    <div className="row">
                        <div className="col-sm-8 col-xs-8 sideBar-name">
                            <span className="name-meta">nkt.9920</span>
                        </div>
                        <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                            <span className="time-meta pull-right">Online</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row sideBar-body">
                <div className="col-sm-3 col-xs-3 sideBar-avatar">
                    <div className="avatar-icon">
                        <img src={avt} />
                    </div>
                </div>
                <div className="col-sm-9 col-xs-9 sideBar-main">
                    <div className="row">
                        <div className="col-sm-8 col-xs-8 sideBar-name">
                            <span className="name-meta">nkt.9920</span>
                        </div>
                        <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                            <span className="time-meta pull-right">Online</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row sideBar-body">
                <div className="col-sm-3 col-xs-3 sideBar-avatar">
                    <div className="avatar-icon">
                        <img src={avt} />
                    </div>
                </div>
                <div className="col-sm-9 col-xs-9 sideBar-main">
                    <div className="row">
                        <div className="col-sm-8 col-xs-8 sideBar-name">
                            <span className="name-meta">nkt.9920</span>
                        </div>
                        <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                            <span className="time-meta pull-right">Online</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ListUser;