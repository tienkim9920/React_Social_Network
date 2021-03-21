import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

Search.propTypes = {
    handler_Search: PropTypes.func
};

Search.defaultProps = {
    handler_Search: null
}

function Search(props) {

    const { handler_Search } = props

    const [search, set_search] = useState('')

    const delaySearchTextTimeOut = useRef(null)

    const onChangeText = (e) => {

        const value = e.target.value

        set_search(value)

        if (handler_Search){
            //Nếu người dùng đang nhập thì mình clear cái giây đó
            if (delaySearchTextTimeOut.current){
                clearTimeout(delaySearchTextTimeOut.current)
            }
            
            delaySearchTextTimeOut.current = setTimeout(() => {
                handler_Search(value)
            }, 700)            
        }

    }

    return (
        <div className="group_search">
            <input className="txt_search" type="text" placeholder="Search..." value={search} onChange={onChangeText} />
            <i className="fa fa-search fix_icon_search"></i>
        </div>
    );
}

export default Search;