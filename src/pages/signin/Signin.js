
import { MdLockOutline } from 'react-icons/md';

import './Signin.scss';

import { useEffect, useState } from "react";

import authActions from "../../actions/authActions";

import { connect } from 'react-redux';

import Form from 'rsuite/Form';

import 'rsuite/Form/styles/index.css';
import 'rsuite/FormControl/styles/index.css';
import 'rsuite/FormControlLabel/styles/index.css';
import 'rsuite/FormErrorMessage/styles/index.css';
import 'rsuite/FormHelpText/styles/index.css';
import 'rsuite/FormGroup/styles/index.css';
import InputGroup from 'rsuite/InputGroup';
import 'rsuite/InputGroup/styles/index.css';
import Button from 'rsuite/Button';
import 'rsuite/Button/styles/index.css';
import MemberIcon from '@rsuite/icons/Member';
import LockRoundIcon from '@rsuite/icons/LockRound';
import ButtonToolbar from 'rsuite/ButtonToolbar';
import 'rsuite/ButtonToolbar/styles/index.css';
import FormErrorMessage from 'rsuite/esm/FormErrorMessage';
const Signin = (props) => {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })


    const handleSubmitForm = (e) => {
        e.preventDefault()
        props.signin(formData)
    }

    const handleOnChangeInput = (name,value) => {
        setFormData({
            ...formData,
            [name]: value
        })

    }


    useEffect(() => {
        props.showLoading(props.isLoading)
    }, [props.isLoading])

    return (
        <div className="signin-page">
            <img src="../../images/loginwidget.png" alt="Logo" className="bg-image" />
            <div className="signin-panel">
                <img src="../../images/tek4icon.png" alt="Logo" className="logo-image" />
                
                <Form fluid>
                  <Form.Group controlId="userName">
                    <Form.ControlLabel>Tên đăng nhập</Form.ControlLabel>
                    <InputGroup>
                      <InputGroup.Addon><MemberIcon/></InputGroup.Addon>
                      <Form.Control 
                        name="userName" 
                        placeholder="Tên đăng nhập"
                        onChange={(value)=>handleOnChangeInput("username",value)}
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.ControlLabel>Mật khẩu</Form.ControlLabel>
                    <InputGroup>
                      <InputGroup.Addon><LockRoundIcon/></InputGroup.Addon>
                      <Form.Control 
                        name="password" 
                        type="password"
                        placeholder="Mật khẩu"
                        onChange={(value)=>handleOnChangeInput("password",value)}
                      />
                    </InputGroup>
                  </Form.Group>

                  <p style={{color: "red"}}>{props.errorMessage}</p>

                  <Form.Group>
                    <ButtonToolbar>
                      <Button 
                        appearance="primary"
                        style={{
                            width: "100%"
                        }}
                        onClick={handleSubmitForm}
                      >
                        Đăng nhập
                      </Button>
                    </ButtonToolbar>
                  </Form.Group>
                </Form>
            </div>
            <div className="signin-header">
                <div className="signin-avatar">
                    <MdLockOutline size='1.36rem'/>
                </div>
                <h1>Sign in</h1>
            </div>
            <form className="signin-main">
                
                

                <p>Liên hệ kỹ thuật: +84338 986 611</p>
            </form>
        </div>
    )
}

//export default Signin

const mapStateToProps = (state) => {
    return {
        isLoading: state.view.isLoading,
        errorMessage: state.auth.errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signin: (formData) => dispatch(authActions.signin(formData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
