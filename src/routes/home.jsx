import { Col, Row } from 'antd';

export default function Home() {
    return (
      <Row justify="center">
        <Col span={8}>
            <img width="800"  style={{ objectFit: "cover"}} src={"https://marvel-b1-cdn.bc0a.com/f00000000052994/www.hillspet.com/content/dam/cp-sites/hills/hills-pet/en_us/exported/pet-care/Skyword/images/black-schnauzers-chewing-on-stick_347811_ref.png"}/>
            <br/>
            <h2>Think carefully before adopting a dog, and you should make sure you will take care of it for a lifetime. Don't buy or adopt a dog on impulse. Many dogs are abandoned because their owners change their minds later.</h2>
      </Col>
      </Row>
    );
  }