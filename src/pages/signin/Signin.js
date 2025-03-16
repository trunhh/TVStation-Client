import { MdLockOutline } from 'react-icons/md';
import { useEffect, useState } from "react";
import authActions from "../../actions/authActions";
import { connect } from 'react-redux';
import { Form, Button, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

const Signin = (props) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmitForm = (e) => {
    e.preventDefault();
    props.signin(formData);
  };

  const handleOnChangeInput = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    props.showLoading(props.isLoading);
  }, [props.isLoading]);

  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundImage: 'url("../../images/haiphong.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="bg-white p-5 rounded shadow-lg">
        <div className="text-center mb-3">
          <img src="../../images/logo-haiphong.svg" alt="Logo" className="img-fluid" style={{maxWidth: "128px"}} />
        </div>

        <Form onSubmit={handleSubmitForm}>
          <Form.Group controlId="username" className="mb-3">
            <Form.Label>Tên đăng nhập</Form.Label>
            <InputGroup>
              <InputGroup.Text><MdLockOutline /></InputGroup.Text>
              <Form.Control 
                type="text"
                name="username"
                placeholder="Tên đăng nhập"
                onChange={(e) => handleOnChangeInput("username", e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Mật khẩu</Form.Label>
            <InputGroup>
              <InputGroup.Text><MdLockOutline /></InputGroup.Text>
              <Form.Control 
                type="password"
                name="password"
                placeholder="Mật khẩu"
                onChange={(e) => handleOnChangeInput("password", e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <p className="text-danger">{props.errorMessage}</p>

          <Button variant="primary" type="submit" className="w-100">
            Đăng nhập
          </Button>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.view.isLoading,
    errorMessage: state.auth.errorMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signin: (formData) => dispatch(authActions.signin(formData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
