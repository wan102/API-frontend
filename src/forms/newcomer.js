import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
    Form,
    Select,
    Input,
    Button,
    Checkbox,
    DatePicker,
  } from 'antd';
import http from '../common/http-common';
import Avatar from '../common/avatar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import { useLocalStorage } from "../common/useLocalStorage";
import moment from 'moment';
const { Option } = Select;


const nameRules = [
    { required: true, type: 'string', message: 'Please input your username at least three letters!', min: 3 }
]

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

function NewcomerForm({animal}) {  
  console.log(animal)
  let navigate = useNavigate();
  const [name, setName] = useLocalStorage("name", false);
  const [password, setPassword] = useLocalStorage("password", false);

  const [ image_url, setImage_url ] = useState();
  const [ loading, setLoading ] = useState(false);
  const [ show, setShow ] = useState(false);

  const [ error, setError ] = useState(false);
  const [ breeds, setBreeds ] = useState();

  useEffect(() => {
    http.get('breeds')
      .then((res)=> {
        setBreeds(res.data)
      })
      .catch((error) => {
          console.log("breeds error", error);
        })
        .then(()=> {
        })
    }, [])

  const goToAdoption = () => {
    navigate("/adoption")
    setShow(false);}

  const handleClose = () => {
    setShow(false);
    setError(false);
  }
  
  const config = {
    rules: [
      {
        type: 'object',
        required: true,
        message: 'Please select time!',
      },
    ],
  };

    
  function onFinishUpdate(values) {
    console.log("onFinishUpdate", values)
    setLoading(true)
    if (image_url) {
      values.image_url = image_url
    }
    console.log("onFinishUpdate Success", values)
    delete values.birthday
    http.put('animals/' + animal.id, {...values},{
      auth: {
        username: name,
        password: password
      }})
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

  function onFinishCreate(values) {
    console.log("Success", values)

    setLoading(true)
    if (image_url) {
      values.image_url = image_url
    }
    console.log("Success", values)

    http.post('animals/', {...values},{
      auth: {
        username: name,
        password: password
      }})
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
    const initialValues = () => {
      animal.birthday = moment(animal.birthday)
      return animal
    }
  return (
    <>
      <Form name="register" {...formItemLayout} scrollToFirstError onFinish={animal? onFinishUpdate: onFinishCreate} initialValues={animal?initialValues(): null}> 
          <div  style={{display: "flex", justifyContent: "center", alignItems: "center"}}><div style={{marginLeft: "auto", marginRight: "auto"}}><Avatar preImage={animal? animal.image_url: null} onSuccess={(event) => setImage_url(event?.file?.response?.url)}/></div></div>
          <Form.Item name="name" label="Name" rules={nameRules}>
                  <Input />
          </Form.Item>

          <Form.Item
          name="breed_id"
          label="Breed"
          hasFeedback
          rules={[{ required: true, message: 'Please select a breed!' }]}
        >
          <Select placeholder="Please select a breed">
              {breeds && breeds.map(({id, name})=> (
                  <Option key={id} value={id}>{name}</Option>
              )
              )}
          </Select>
        </Form.Item>

        <Form.Item name="birthday" label="Birthday" {...config}>
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          hasFeedback
          rules={[{ required: true, message: 'Please select a gender!' }]}
        >
          <Select placeholder="Please select a gender">
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="centre_id"
          label="Centre"
          hasFeedback
          rules={[{ required: true, message: 'Please select a centre!' }]}
        >
          <Select placeholder="Please select a centre">
                  <Option value={1}>Hong Kong Centre - HQ</Option>
                  <Option value={2}>Kowloon Centre</Option>
                  <Option value={3}>Mong Kok Adopt-a-Pet Centre</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="isneutered"
          valuePropName="checked"
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          <Checkbox>Is Neutered</Checkbox>

        </Form.Item>
          <Form.Item name="note" label="Note">
              <Input.TextArea />
          </Form.Item>

          <Form.Item
          name="status"
          label="Status"
          hasFeedback
          rules={[{ required: true, message: 'Please select a status!' }]}
        >
          <Select placeholder="Please select a status">
                  <Option value="reserved">Reserved</Option>
                  <Option value="available">Available</Option>
                  <Option value="occupied">Occupied</Option>
          </Select>
        </Form.Item>

          <Form.Item {...tailFormItemLayout}>
              <Button loading={loading} type="primary" htmlType="submit">
                  Submit
              </Button>
            <Button disabled={loading} type="reset" htmlType="reset">
                  Reset
              </Button>
          </Form.Item>
        </Form>
        <Modal show={show} onHide={handleClose} backdrop="static" >
          <Modal.Header closeButton>
            <Modal.Title>{!error? "Result Success" : "Result Error"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {!error? "Congratulations, Result Success. \n Let's go to Adoption." : error}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={error? handleClose : goToAdoption}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>

      </>
  );    
}  

export default NewcomerForm;