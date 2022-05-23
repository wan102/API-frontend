import { 
    Image,
    Form,
    Select,
    Button, } from 'antd';
import http from '../common/http-common';
import { slashReplaceHyphen } from '../common/formatting';
import { useEffect, useState } from 'react';
const { Option } = Select;

const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
  };
const tailFormItemLayout = {
wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

export default function BreedSelector({onFinish}) {
    const [ loading, setLoading ] = useState(false);
    const [image, setImage] = useState();
    const [ breeds, setBreeds ] = useState();

    useEffect(() => {
        setLoading(true)
        http.get('breeds')
          .then((res)=> {
            setBreeds(res.data)
            setLoading(false)
          })
        }, [])
    return (
      <main style={{ padding: "1rem 0" }}>
        <Form name="search" {...formItemLayout} scrollToFirstError onFinish={onFinish}> 
            <Form.Item
                name="breed"
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
        <Form.Item {...tailFormItemLayout}>
            <Button disabled={loading} type="primary" htmlType="submit">
                Search
            </Button>
        </Form.Item>
        </Form>
      </main>
    );
  }