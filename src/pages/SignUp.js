import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import DynamicForm from '../components/DynamicForm';
import { userActions, siteMapActions } from '../redux/reduxes';
import { RoleConst } from '../constants/constants';
import { ADMIN_USER } from '../constants/routeConstants';

const role = localStorage.getItem('role');
const siteMapName = localStorage.getItem('siteMapName');
const myUserName = localStorage.getItem('userName');

const SignUp = (
  {
    selected,
    create,
    getSiteMap,
    ...props 
  }) => 
  {


  const pwPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$"
  const pwText = "Mật khẩu phải có: ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt (!@#$%^&*)"

  const fieldProps = {
    userName: { type: "text", label: "Username", required: true, title: "Tên người dùng là bắt buộc"},
    password: { type: "password", label: "Mật khẩu", pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$", title: "Mật khẩu phải có: ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt (!@#$%^&*)", required: true },
    name: { type: "text", label: "Họ và tên", required: true, title: "Họ và tên là bắt buộc"},
    email: { type: "email", label: "Email", required: true, title: "Email không hợp lệ" },
    phoneNumber: { type: "tel", label: "Số điện thoại", required: true, pattern: "^0\\d{9}$", title: "Số điện thoại phải có 10 chữ số, bắt đầu bằng số 0" },
    siteMapId: { data: props.siteMap, label: "Phòng ban" , required: true},
    role: { data: RoleConst, label: "Vai trò" , required: true},
  }


  
  const [cfgForm, setCfgForm] = useState({
    userName: "",
    password: "",
    name: "",
    email: "",
    phoneNumber: "",
    siteMapId: null,
    role: ""
  });


  const navigate = useNavigate();

  const handleSubmit = (form) => {
    console.log(form)
    create(form);
  };

  useEffect(() => {
    getSiteMap();
  }, [])

  useEffect(() => {
    if (props.isCreated) navigate(ADMIN_USER);
  }, [props.isCreated])



  return (
    <section className="container bg-white shadow-lg rounded p-4 my-5">
        <DynamicForm form={cfgForm} setForm={setCfgForm} fieldProps={fieldProps} onSubmit={handleSubmit}/>
    </section>
  );
};

const mapStateToProps = (state) => ({
  siteMap: state.siteMap.list,
  ...state.user
});

const mapDispatchToProps = (dispatch) => ({
  create: (userName) => dispatch(userActions.create(userName)),
  getSiteMap: () => dispatch(siteMapActions.getList())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
