import LoginForm from '../form/loginform'
import { Col, Row } from 'antd';

export default function Login() {
    return (
      <Row justify="center">
        <Col span={6}>
          <main style={{ padding: "1rem 0" }}>
          <h2>Login</h2>
          <LoginForm />
        </main>
        </Col>
      </Row>
    );
  }