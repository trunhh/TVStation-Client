import styled from "styled-components"

import CustomInput from '../../../_sharecomponents/custominput/CustomInput'

import FormGroup from '../../../_sharecomponents/formgroup/FromGroup'

import Button from '../../../_sharecomponents/custombutton/CustomButton'

import userActions from "../../../actions/userActions"

import { connect } from "react-redux"
import { useEffect, useState } from "react"

import { RiFolderUploadFill } from 'react-icons/ri'

const UserInfo = (props) => {

    console.log(props)
    
    const [user, setUser] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        avatarUrl: ''
    })    

    const [avatarUrl, setAvatarUrl] = useState('')

    const [avatarUploadFile, setAvatarUploadFile] = useState(null)

    const [selectedFile, setSelectedFile] = useState(null)

    useEffect(() => {
        props.get(localStorage.getItem('userName'))
    }, [])

    useEffect(() => {
        if (props.user.avatarUrl != null && props.user.avatarUrl != '') {
            let avatarUrl = props.user.avatarUrl
            let temp = avatarUrl.split('\\')
            setAvatarUrl(temp[temp.length - 2] + '/' + temp[temp.length - 1])
        }

        setUser({...props.user})
    }, [props.user])

    useEffect(() => {
        props.showLoading(props.isLoading)
    }, [props.isLoading])

    const handleInputChange = (e) => {
        setUser({...user, [e.target.name] : e.target.value})
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        props.update(user, avatarUploadFile)
    }

    const onFileChange = (e) => {
        setAvatarUploadFile(e.target.files[0])
        let url = URL.createObjectURL(e.target.files[0])
        setAvatarUrl(url)
    }

    return(
        <div className={props.className}>
            <div className='user-container'>
                <div className="top">

                </div>
                <div className="overlay-top"></div>
                <div className="avatar">
                    <img src = {avatarUrl} />
                    <div className="upload">
                        <label htmlFor="file_id">
                            <RiFolderUploadFill color="gray" fontSize="1.2em" className="icon-upload"/>
                        </label>
                        <input type="file" name="file" id="file_id" onChange={onFileChange}/>
                    </div>
                </div>
                <div className="icon-plus">
                    <span>+</span>
                </div>
                <div className="content">
                    <form className="form-update">
                        {props.errorMessageLoadUser &&
                            <div className="error">
                                <p>Server response status code: {props.errorMessageLoadUser.statusCode}.&nbsp; </p>
                                <p>{props.errorMessageLoadUser.message}</p>
                            </div>
                        }
                        {   !props.errorMessageLoadUser &&
                            <div className="about-user">
                                <h1>ABOUT USER</h1>
                                <p>
                                    FrontEnd Developer@Creative-Tim • Major interest in Web 
                                    Development: motivated to achieve measurable results, 
                                    to deepen my knowledge and improve my skills.
                                </p>        
                            </div>
                        }
                        <FormGroup>
                                    <CustomInput type="text" 
                                        label="Name *" 
                                        name="name"
                                        value={user.name}
                                        onChangeInput={handleInputChange}
                                    />
                            </FormGroup>
                        <FormGroup >
                                <CustomInput type="text" 
                                    label="Username *" 
                                    name="username"
                                    value={user.username}
                                    onChangeInput={handleInputChange}
                                />
                        </FormGroup>
                        <FormGroup >
                            <CustomInput type="email" 
                                label="Email *" 
                                name="email"
                                value={user.email}
                                onChangeInput={handleInputChange}
                            />
                        </FormGroup>
                        <div className='btn-submit'>
                            <Button
                                type="submit"
                                uppercase
                                width="100%"
                                onClick={handleSubmitForm}
                            >
                                update
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const StyledUserInfo = styled(UserInfo) `
    ${'' /* height: 100%; */}
    height: 800px;
    width: 560px;
    margin: auto;
    ${'' /* border: 1px solid gray; */}
    padding: 30px 0 20px 0;

    .about-user {
        margin-top: -50px;
    }

    .about-user h1 {
        text-align: center;
        color: rgba(0, 0, 0, .4);
        font-size: 24px;
    }

    .about-user p {
        text-align: center;
        color: rgba(0, 0, 0, .5);
        font-size: .75rem;
        margin-top: 8px;
    }

    .form-update {
        width: 60%;
        margin: auto;
    }
    
    .icon-plus {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #9e27b0;
        position: absolute;
        top: 27%;
        right: 2rem;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .icon-plus span {
        font-size: 1.6rem;
    }


    .avatar {
        width: 130px;
        height: 130px;
        background-color: #fff;
        border-radius: 50%;
        position: absolute;
        top: 22%;
        left: 2rem;
        ${'' /* background-image: url('/images/avatar.jpg'); */}
        background-position: center ;
        background-size: cover;
    }

    .avatar img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .error {
        ${'' /* display: flex;
        justify-content: center; */}
        color: red;
    }

    .error p {
        margin-bottom: 0;
    }

    .user-container {
        height: 100%;
        width: 100%;
        ${'' /* border: 1px solid green; */}
        display: flex;
        flex-direction: column;
        border-radius: 6px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;

        position: relative;

        overflow: hidden;
    }

    .top {
        ${'' /* height: 40%; */}
        height: 320px;
        background-image: linear-gradient(315deg, rgba(0, 128, 206, 0.8) 0%,  rgba(0, 128, 206, 0.8) 74%), url('/images/mountain.jpg');
        ${'' /* background-image: linear-gradient(90deg, rgba(114,215,250,1) 0%, rgba(58,198,246,1) 35%, rgba(27,186,251,1) 100%), url('/images/mountain.jpg'); */}
        background-position: center;
        background-size: cover;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }

    .overlay-top {
        height: 160px;
        background-color: #eeeeee;
        transform: rotate(-10deg);
        position: absolute;
        width: 150%;
        top: 28%;
        z-index: 0;
    }

    .content {
        background-color: #eeeeee;
        flex: 1;
        border-radius: 6px;
        position: relative;
        z-index: 2;
    }

    .full-name {
        display: flex;
    }

    .full-name > div:first-child {
        margin-right: 5px;
    }

    .full-name > div:last-child {
        margin-left: 5px;
    }

    .upload input {
        position: absolute;
        z-index: -1;
        opacity: 0;
    }

    .icon-upload {
        position: absolute;
        left: 50%;
        bottom: -17px;
        cursor: pointer;
        transform: translate(-50%, 0);
        z-index: 3;
    }

    .btn-submit {
        margin-top: .8rem;
    }

`

const mapStateToProps = (state) => {
    return {
        isLoading: state.view.isLoading,
        user: state.user.user,
        errorMessageLoadUser: state.user.errorMessageLoadUser,
    }
}

const mapDispathToProps = (dispatch, props) => {
    return {
        get: (userName) => {
            dispatch(userActions.get(userName))
        },
        update: (user, avatarUploadFile) => {
            dispatch(userActions.update(user, avatarUploadFile))
        }
    }
}

export default connect(mapStateToProps, mapDispathToProps)(StyledUserInfo)