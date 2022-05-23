import React, { useEffect, useState } from 'react';
import { Comment, Form, Input, Button} from 'antd';
import { Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const usernameRules = [
  { required: true, type: 'string', message: 'At least three letters!', min: 3 }
]
const commentRules = [
  { required: true, type: 'string', message: 'At least three letters!', min: 3 }
]

const Editor = ({ name, isAdmin, onChange, onSubmit, value, loading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    console.log("run value", value)
    form.setFieldsValue({
      user_name: name? isAdmin? name + "(Admin)": name + "(Member)": "",
                      comment: ''
    });
  }, [value]);

    return(<>
     <Form
      form={form}
      id="commentform"
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      // initialValues={{ user_name: name? isAdmin? name + "(Admin)": name + "(Member)": "",
      //                 comment: value }}
      onFinish={onSubmit}
      autoComplete="off"
    >
      <Form.Item
        name="user_name"
        rules={usernameRules}>
        <Input disabled={name || loading} placeholder="User Name" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item
        name="comment"
        rules={commentRules}>
        <TextArea disabled={loading} showCount maxLength={100} rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button loading={loading} htmlType="submit" type="primary">
          Add Comment
        </Button>
      </Form.Item>
      </Form>
    </>
  )};

const NewCommentCard = ({isAdmin, name, handleSubmit, loading, comment, onChange}) => {


  return (
        <Comment
        avatar={<Avatar src="https://joeschmoe.io/api/v1/abc" />}
        content={
          <Editor
            onSubmit={handleSubmit}
            value={comment}
            loading={loading}
            name={name}
            isAdmin={isAdmin}
            onChange={onChange}
          />
        }
    />
    )
}
export default NewCommentCard