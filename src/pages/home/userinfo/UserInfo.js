import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import viewActions from '../../../actions/viewActions'; 
import userActions from '../../../actions/userActions';
import { Schema } from 'rsuite';
const UserInfo = (props) => {
    const { StringType, NumberType} = Schema.Types;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        avatarUrl: "",
    });
    const [pwFormData, setPwFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const model = Schema.Model({
        name: StringType().isRequired('Vui lòng điền tên của bạn'),
        email: StringType().isEmail('Please enter a valid email address.'),
        phoneNumber: NumberType("Số điện thoại chỉ bao gồm số")
      });

    return (
        <div >
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ...state.user,
        isLoading: state.view.isLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        get: () => dispatch(userActions.get()),
        update: () => dispatch(userActions.update()),
        updatePassword: () => dispatch(userActions.updatePassword())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
