import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import UserInfoPanel from './UserInfoPanel';
import ChangePasswordPanel from './ChangePasswordPanel';
const UserInfo = (props) => {
    // useEffect(() => {
    //     props.showLoading(props.isLoading)
    // }, [props.isLoading])
    
    return (
        <div style={{padding: "24px 32px"}}>
            <UserInfoPanel/>
            <ChangePasswordPanel/>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.view.isLoading
    };
};

export default connect(mapStateToProps, null)(UserInfo);
