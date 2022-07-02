import AdoptionCard from '../utilities/adoptioncard'
import Comments from '../form/comments'
import { Row, Col, Image } from 'antd';
import { 
    useParams,
   } from "react-router-dom";

export default function AdoptionPage() {
  let params = useParams();

    return (
      <main style={{ padding: "1rem 0" }}>
        <Row>
          <Col>
            <AdoptionCard animal_id={params.animalId} />
            <Comments animal_id={params.animalId}/>
          </Col>
        </Row>
      </main>
    );
  }