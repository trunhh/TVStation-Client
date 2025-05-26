import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Tab, Nav } from 'react-bootstrap';
import DynamicForm from '../components/DynamicForm';
import BootstrapVideoUploader from '../components/BootstrapVideoUploader';
import { userActions, siteMapActions } from '../redux/reduxes';
import { updatePassword } from '../redux/authActions';

const role = localStorage.getItem('role');
const siteMapName = localStorage.getItem('siteMapName');
const myUserName = localStorage.getItem('userName');

const UserDetail = (
  {
    selected,
    get, update, updatePassword,
    getSiteMap,
    ...props 
  }) => 
  {
  const { userName } = useParams();


  const fieldProps = {
    name: { type: "text", label: "Họ và tên", required: true, title: "Họ và tên là bắt buộc"},
    email: { type: "email", label: "Email", required: true, title: "Email không hợp lệ" },
    phoneNumber: { type: "tel", label: "Số điện thoại", required: true, pattern: "^0\\d{9}$", title: "Số điện thoại phải có 10 chữ số, bắt đầu bằng số 0" },
  }


  const pwPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$"
  const pwText = "Mật khẩu phải có: ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt (!@#$%^&*)"

  const pwFieldProps = {
    oldPassword: { type: "password", label: "Mật khẩu hiện tại", pattern: {pwPattern}, title: {pwText} },
    newPassword: { type: "password", label: "Mật khẩu mới", pattern: {pwPattern}, title: {pwText}}
  }

  const [cfgForm, setCfgForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [pwdForm, setPwdForm] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const [mediaUrl, setMediaUrl] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (userName) {
      console.log(userName)
      get(userName);
    } 
  }, [userName]);

  useEffect(() => {
    if (selected) {
      console.log(selected)
      setCfgForm((prev) => ({
        ...prev,
        name: selected.name,
        email: selected.email,
        phoneNumber: selected.phoneNumber
      }));
      setMediaUrl(selected.mediaUrl);
    }
  }, [selected]);

  const handleSubmit = (form) => {
    if (userName) update(userName, form);
    //else create(programme.userName, {title, script, mediaUrl, ...cfgForm});
  };

  const handleSubmitPassword = (form) => {
    updatePassword(form);;
  };


  return (
    <section className="container bg-white shadow-lg rounded p-4 my-5">
        <Tab.Container defaultActiveKey="config">
          <div className="d-flex py-3 flex-column align-items-center justify-content-center">
            <BootstrapVideoUploader
              // mediaUrl={mediaUrl}
              // onUpload={(url) => setMediaUrl(url)}
              className="rounded-circle"
              style= {{ height: "8rem", width: "8rem"}}
              accept="image/*"
            />
            @{userName}
            <small className="text-muted">{role}</small>
            <small className="text-muted">{siteMapName}</small>
          </div>

          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="config">Thông tin</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="password">Đổi mật khẩu</Nav.Link>
            </Nav.Item>
          </Nav>



          <Tab.Content className="py-3">
            <Tab.Pane eventKey="config">
              <DynamicForm form={cfgForm} setForm={setCfgForm} fieldProps={fieldProps} onSubmit={handleSubmit}/>
            </Tab.Pane>

            <Tab.Pane eventKey="password">
            {(userName && selected) && (
              <div className="d-flex">
                <DynamicForm form={pwdForm} setForm={setPwdForm} fieldProps={pwFieldProps} onSubmit={handleSubmitPassword}/>
              </div>
            )}
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
    </section>
  );
};

const mapStateToProps = (state) => ({
  siteMap: state.siteMap.list,
  ...state.user
});

const mapDispatchToProps = (dispatch) => ({
  get: (userName) => dispatch(userActions.get(userName)),
  update: (userName,data) => dispatch(userActions.update(userName,data)),
  updatePassword: (data) => dispatch(updatePassword(data)),
  getSiteMap: () => dispatch(siteMapActions.getList())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
