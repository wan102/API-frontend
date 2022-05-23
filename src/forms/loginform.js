import React, { useState } from "react";
import { Form, Input, Button} from 'antd';
import http from '../common/http-common'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import { useLocalStorage } from "../common/useLocalStorage";


const passwordRules = [
    { required: true, message: 'Please input your password!' }
];

const usernameRules = [
  { required: true, type: 'string', message: 'At least three letters!', min: 3 }
]

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};

const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

function LoginForm() {
  let navigate = useNavigate();

  const [name, setName] = useLocalStorage("name", false);
  const [isAdmin, setIsAdmin] = useLocalStorage("isAdmin", false);
  const [password, setPassword] = useLocalStorage("password", false);
  const [id, setId] = useLocalStorage("id", false);

  const [ loading, setLoading ] = useState(false);
  const [ show, setShow ] = useState(false);
  const [ error, setError ] = useState(false);

  const goToHome = () => {
    navigate("/adoption")
    setShow(false);
    window.location.reload(false);
  }

  const handleClose = () => {
    setShow(false);
    setError(false);
  }

  function onFinish(values) {
    console.log("Success", values);
    setLoading(true)
    http.post('users/login/', {...values})
    .then((response)=> {
      console.log("response:  ", response)
      setName(response.data.user_name)
      setPassword(response.data.password)
      setIsAdmin(response.data.is_admin)
      setId(response.data.id)
    })
    .catch((error) => {
      console.log("error: ", error);
      setError(error.response.data?.error_message)
    })
    .then(() =>{
      setShow(true)
      setLoading(false)
    })
  }

  return (
    <>
    <Form name="login" {...formItemLayout} scrollToFirstError onFinish={onFinish}> 
        <Form.Item name="user_name" label="Username" rules={usernameRules}>
            <Input />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback>
            <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
            <Button loading={loading} type="primary" htmlType="submit">
                Login
            </Button>
          <Button disabled={loading} type="reset" htmlType="reset">
                Reset
            </Button>
        </Form.Item>
      </Form>
      <Modal show={show} onHide={handleClose} backdrop="static" >
        <Modal.Header closeButton>
          <Modal.Title>{!error? "Login Success" : "Login Error"}</Modal.Title>
        </Modal.Header>
      <Modal.Body>
      {!error? "Congratulations! \n Let's go to Adoption page." : error}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={error? handleClose : goToHome}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );    
}  

export default LoginForm;