import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import userActions from '../../../actions/userActions';
import { Schema } from 'rsuite';
import Form from 'rsuite/Form';
import 'rsuite/Form/styles/index.css';
import ButtonToolbar from 'rsuite/ButtonToolbar';
import 'rsuite/ButtonToolbar/styles/index.css';
import { CustomFormControl, CustomSubmitButton, CustomCancelButton } from '../../../_sharecomponents/customrsuite/CustomRsuite';
import "./UserInfoPanel.css"

const UserInfoPanel = (props) => {
    const { StringType, NumberType} = Schema.Types;
    const formRef = useRef();
    const [formError, setFormError] = useState({});
    const [formValue, setFormValue] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        avatarUrl: "",
    });

    useEffect(() => {
        props.get();
    }, []);

    useEffect(() => {
        if (props.user) {
            setFormValue((prevFormValue) => ({
            ...prevFormValue,
            ...props.user
            }));
        }
    }, [props.user]);

    const handleSubmit = () => {
        if (!formRef.current.check()) return
        props.update(formValue)
    };

    const handleCancel = () => {
        console.log("cancel")
        setFormValue((prevFormValue) => ({
            ...prevFormValue,
            ...props.user
            }));
    };

    const model = Schema.Model({
        name: StringType().isRequired('Không được bỏ trống tên'),
        email: StringType().isEmail('Địa chỉ Email chưa hợp lệ'),
        phoneNumber: NumberType("Số điện thoại chỉ bao gồm số")
      });

    return (
        <Form
            ref={formRef}
            onChange={setFormValue}
            onCheck={setFormError}
            formValue={formValue}
            model={model}
            className="info-panel"
        >
            <CustomFormControl name="name" label="Họ và tên" />
            <CustomFormControl name="email" label="Email" />
            <CustomFormControl name="phoneNumber" label="Số điện thoại" />
            <CustomFormControl name="address" label="Địa chỉ"/>
            <ButtonToolbar>
              <CustomSubmitButton type="button" onClick={handleSubmit}/>
              <CustomCancelButton type="button" onClick={handleCancel}/>
            </ButtonToolbar>
        </Form>
    );
};

const mapStateToProps = (state) => {
    return {
        ...state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        get: () => dispatch(userActions.get()),
        update: (formValue) => dispatch(userActions.update(formValue)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoPanel);
