import NewcomerForm from '../form/newcomer'
import BreedSearch from './breedsearch'
import { Row, Col, Image } from 'antd';

export default function Newcomer() {
  
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Adding Newcomer</h2>
        <Row>
          <Col span={12}><NewcomerForm /></Col>
          <Col span={12}><BreedSearch /></Col>
        </Row>
      </main>
    );
  }