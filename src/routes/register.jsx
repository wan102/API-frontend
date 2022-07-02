import { Col, Row } from 'antd';
import RegistrationForm from '../form/registrationform';
export default function Register() {
    return (
      <Col>
        <Row justify="center">
          <main style={{ padding: "1rem 0" }}>
            <RegistrationForm />
          </main>
        </Row>
      </Col>
    );
  }