import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import userActions from '../../../actions/userActions';
import { CustomFormControl, CustomSubmitButton, CustomCancelButton } from '../../../_sharecomponents/customrsuite/CustomRsuite';
import "./UserInfoPanel.css"

const ChangePasswordPanel = (props) => {
    // const { StringType, NumberType} = Schema.Types;
    const formRef = useRef();
    const [formError, setFormError] = useState({});
    const [formValue, setFormValue] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const handleSubmit = () => {
        if (!formRef.current.check()) return
        props.updatePassword(formValue)
    };


    // const model = Schema.Model({
    //     newPassword: StringType().isRequired().proxy(['confirmNewPassword']),
    //     confirmNewPassword: StringType().equalTo('newPassword')
    //   });

    return ( <></>
        // <Form
        //     ref={formRef}
        //     onChange={setFormValue}
        //     onCheck={setFormError}
        //     formValue={formValue}
        //     model={model}
        //     className="info-panel"
        // >
        //     <CustomFormControl name="oldPassword" type="password" label="Mật khẩu hiện tại" />
        //     <CustomFormControl name="newPassword" type="password" label="Mật khẩu mới" />
        //     <CustomFormControl name="confirmNewPassword" type="password" label="Xác nhận mật khẩu mới" />
        //     <ButtonToolbar>
        //       <CustomSubmitButton type="button" onClick={handleSubmit}/>
        //     </ButtonToolbar>
        // </Form>
    );
};

const mapStateToProps = (state) => {
    return {
        ...state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updatePassword: (formValue) => dispatch(userActions.updatePassword(formValue)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordPanel);
