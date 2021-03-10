import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import DetailPost from './Component/DetailPost';

MainPost.propTypes = {

};

function MainPost(props) {
    return (
        <Switch>

            <Route exact path='/post/:id' component={DetailPost}/>

        </Switch>
    );
}

export default MainPost;