import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import DetailUser from './Component/DetailUser';
import SettingUser from './Component/SettingUser';

MainUser.propTypes = {
    
};

function MainUser(props) {
    return (
        <Switch>
            <Route exact path='/account/:id' component={DetailUser} />
            <Route path='/account/:id/setting' component={SettingUser} />
        </Switch>
    );
}

export default MainUser;