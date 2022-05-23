import { useEffect, useState } from 'react';
import { Divider, Row, Col } from 'antd';
import http from '../common/http-common';
import CentresGrids from '../form/centresgrids';

export default function Centres() {

  const [ loading, setloading ] = useState(true);
  const [ error, setError ] = useState(null)
  const [ centres, setCentres ] = useState(null);

  useEffect(() => {
    http.get('centres')
      .then(({status, data, message})=> {
        if (status === 200) {
          console.log(data)
          setCentres(data)
        } else {
          setError(message)
        }
      })
      .catch((error) => {
          console.log(error);
          setError(error)
        })
        .then(()=> {
          setloading(false)
        })
    }, [])


    return (
      <main style={{ padding: "1rem 0" }}>
        <Row justify="center" >
          <Col className="gutter-row" span={25}>
            <Divider orientation="left"><h1>Our Centres</h1></Divider>
          </Col>
        </Row>
        {!loading && centres &&
          <CentresGrids centres={centres} />
        }
      </main>
    );
  }