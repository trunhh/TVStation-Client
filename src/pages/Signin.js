import { useEffect, useState } from "react";
import { signin } from "../redux/authActions";
import { connect } from 'react-redux';
import { Form, Button, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { THP_Logo } from "../components/Logo";

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

  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100"
    >
      <div className="bg-white p-5 rounded shadow-lg">
        <div className="text-center mb-3">
          <THP_Logo size={8}/>
        </div>

        <Form onSubmit={handleSubmitForm}>
          <Form.Group controlId="username" className="mb-3">
            <Form.Label>Tên đăng nhập</Form.Label>
            <InputGroup>
              <InputGroup.Text>@</InputGroup.Text>
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
              <InputGroup.Text>*</InputGroup.Text>
              <Form.Control 
                type="password"
                name="password"
                placeholder="Mật khẩu"
                onChange={(e) => handleOnChangeInput("password", e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Đăng nhập
          </Button>
        </Form>
      </div>
    </div>
  );
};


const mapDispatchToProps = (dispatch) => {
  return {
    signin: (formData) => dispatch(signin(formData))
  };
};

export default connect(null, mapDispatchToProps)(Signin);
