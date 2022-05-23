import { useParams } from "react-router-dom";
import { Row, Col, Image } from 'antd';
import AdoptionCard from '../common/adoptioncard'
import Comments from '../forms/comments'

export default function AdoptionPage() {
  let params = useParams();

  return (
    <main style={{ padding: "1rem 0" }}>
      <Row>
        <Col span={18}><AdoptionCard animal_id={params.animalId} /></Col>
        <Col span={6}><Comments animal_id={params.animalId} /></Col>
      </Row>
    </main>
  );
}