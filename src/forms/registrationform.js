import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import http from '../common/http-common';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';

const emailRules = [
    {type: 'email', message: 'The input is not valid E-mail!'},
    {required: true, message: 'Please input your E-mail!' }
];
const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const passwordRules = [
    { required: true, type: 'string', whitespace: false, message: 'Please input your password with 8 to 16 letters!', min: 8, max: 16 },
    ({ getFieldValue }) => ({
      validator(rule, value) {
        if(regex.test(value)) {
          return Promise.resolve();
        }
        return Promise.reject('Minimum eight characters, at least one uppercase letter, one lowercase letter and one number !'); 
      }
    })
];

const confirmRules = [
    { required: true, message: 'Please confirm your password!' },
    ({ getFieldValue }) => ({
        validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject('The passwords that you entered do not match!');
        }
    })
];

const usernameRules = [
    { required: true, type: 'string', message: 'Please input your username at least three letters!', min: 3 }
]

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

function RegistrationForm() {  
  let navigate = useNavigate();

  const [ loading, setLoading ] = useState(false);
  const [ show, setShow ] = useState(false);

  const [ error, setError ] = useState(false);

  const goToLogin = () => {
    navigate("/login")
    setShow(false);}

  const handleClose = () => {
    setShow(false);
    setError(false);
  }

  function onFinish(values) {
    console.log("Success", values)
    setLoading(true)
    const {confirm, ...data} = values;
    if (data.admin_password === "") {
      delete data.admin_password
    }
    console.log("Success", data)

    http.post('users/register/', {...data})
      .then((response)=> {
        console.log("response", response.data.message)        
      })
      .catch((error) => {
          console.log("error", error);
          setError(error.response.data?.error_message)
      })
      .then(()=> {
        setLoading(false)
        setShow(true)
      })
    }
  return (
    <>
    <Form name="register" {...formItemLayout} scrollToFirstError onFinish={onFinish}> 
        <Form.Item name="email" label="E-mail" rules={emailRules}>
            <Input />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback>
            <Input.Password />
        </Form.Item>

        <Form.Item name="confirm" label="Confirm Password" rules={confirmRules} hasFeedback>
            <Input.Password />
        </Form.Item>

        <Form.Item name="user_name" label="Username(for login)" rules={usernameRules}>
            <Input />
        </Form.Item>

      <Form.Item name="admin_password" label="Passcode for Staff">
            <Input placeholder="Staff Only"/>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
            <Button loading={loading} type="primary" htmlType="submit">
                Register
            </Button>
          <Button disabled={loading} type="reset" htmlType="reset">
                Reset
            </Button>
        </Form.Item>
      </Form>
      <Modal show={show} onHide={handleClose} backdrop="static" >
        <Modal.Header closeButton>
          <Modal.Title>{!error? "Register Success" : "Register Error"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {!error? "Congratulations, your account has been successfully created. \n Let's go to login." : error}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={error? handleClose : goToLogin}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  );    
}  

export default RegistrationForm;