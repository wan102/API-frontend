import { Row, Col} from 'antd';
import CentreCard from '../common/centrecard';
function CentresGrids({centres}) { 

    return (
        <>
        <Row justify="center" gutter={[0, 24]}>
            {centres.map((centre, index) => (
                <Col key={index} className="gutter-row" span={20}>
                    <CentreCard centre={centre} />
                </Col>
            ))
            }
        </Row>
        </>
    );
}
export default CentresGrids;