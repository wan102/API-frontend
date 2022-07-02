import { 
    Input,
    Form,
    Select,
    Button, } from 'antd';
    
const searchRules = [
    { required: true, type: 'string', message: 'Please enter dog name'}
]
const tailFormItemLayout = {
    wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
    };
const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
  };

export default function SearchField({onSearch}) {

    return (
        <Form name="search" {...formItemLayout} scrollToFirstError onFinish={onSearch}> 
            <Form.Item name="name" label="Search by name" rules={searchRules}>
                <Input />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Search
                </Button>
            </Form.Item>
        </Form>
    )

}