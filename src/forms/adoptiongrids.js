import { Row, Col} from 'antd';
import array_chunk from '../common/array_chunk';
import Animalcard from '../common/animalcard';
function AdoptionGrids({animals}) { 
    // const rows = array_chunk(animals, 4)

    return (
        <>
        <Row justify="center" gutter={[0, 24]}>
            {animals.map((animal, index) => (
                <Col key={index} className="gutter-row" span={5}>
                    <Animalcard animal={animal} />
                </Col>
            ))
            }
        </Row>
        </>
    );
}
export default AdoptionGrids;