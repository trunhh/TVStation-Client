import styled from "styled-components";
import CustomInput from "../../../_sharecomponents/custominput/CustomInput";
import FormGroup from "../../../_sharecomponents/formgroup/FromGroup";
import CustomButton from "../../../_sharecomponents/custombutton/CustomButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import userActions from "../../../actions/userActions";

//import WithLoading from "../../../_sharecomponents/loading/WithLoading";

const PasswordChanging = (props) => {
    const username = localStorage.getItem('username');
    console.log('username: ' + username);

    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(6, "Minimum 6 characters")
                .max(15, "Minimum 15 characters")
                .required("Required!")
        }),
        onSubmit: values => {
            props.changePassword(username, values.password);
        }
    })

    useEffect(() => {
        props.showLoading(props.isLoading)
    }, [props.isLoading])

    return (
        <div className={props.className}>
            <form 
                className="content" 
                onSubmit={formik.handleSubmit}
            >
                <h3>Change password</h3>
                <FormGroup>
                    <CustomInput 
                        label='New password *'
                        type='password'
                        name='password'
                        value={formik.values.password}
                        onChangeInput={formik.handleChange}
                    />
                    {formik.errors.password && formik.touched.password &&(
                        <p>{formik.errors.password}</p>
                    )}
                </FormGroup>
                <FormGroup>
                    <CustomButton
                        type="submit"
                        color="#ffffff"
                        width="100%"
                        uppercase
                    >
                        Submit
                    </CustomButton>
                </FormGroup>
                <FormGroup>
                    <p style={{color: 'blue'}}>{props.successMessageChangePassword}</p>
                    <p>{props.errorMessageChangePassword}</p>
                </FormGroup>
            </form>
        </div>
    )

}

const PasswordChangingStyled = styled(PasswordChanging) `
    height: calc(100vh - 108px);
    position: relative;
    width: 400px;
    
    .content {
        width: 400px;
        margin: auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    h3 {
        text-align: center;
    }

    .content .form-group p {
        color:  red;
        font-size: .8rem;
        position: absolute;
        top: 100%;
    }
`

const mapStateToProps = (state) => {
    return {
        isLoading: state.view.isLoading,
        errorMessageChangePassword: state.user.errorMessageChangePassword,
        successMessageChangePassword: state.user.successMessageChangePassword,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        changePassword: (username, password) => {
            dispatch(userActions.changePassword(username, password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChangingStyled);
