import { Divider, Row, Col, Typography } from 'antd';
import AdoptionGrids from '../form/adoptiongrids';
import BreedSelector from '../utilities/breedselector';
import SearchField from '../utilities/searchfield';
import { useEffect, useState } from 'react';
import http from '../utilities/http-common';
const { Title, Paragraph, Text, Link } = Typography;

export default function Adoption() {

  const [ loading, setloading ] = useState(true);
  const [ error, setError ] = useState(null)
  const [ animals, setAnimals ] = useState(null);
  const [ breedId, setBreedId ] = useState();
  
  useEffect(() => {
    http.get('animals')
      .then(({status, data, message})=> {
        if (status === 200) {
          console.log(data)
          setAnimals(data)
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
    const onSearch = (search) => {
      console.log("onSearch", search.name)
      http.get('animals/search/' + search.name)
      .then(({status, data, message}) => {
        setAnimals(data)
      })
    }
    const onFinish = (breed) => {
      console.log("breedId", breed.breed)
      http.get('animals/filter/' + breed.breed)
      .then(({status, data, message})=> {
        if (status === 200) {
          console.log(data)
          setAnimals(data)
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
    }
    return (
      <main style={{ padding: "1rem 0" }}>
        {error && <p>{error}</p>}
        {!loading && !error &&
        <><Row justify="center" >
          <Col className="gutter-row" span={25}>
            <Title level={2}>Adopt Dogs</Title>
            <Paragraph>
              <pre>
                The Society for the Prevention of Cruelty to Animals was first formed by a group of volunteers in 1903 and became active in 1921.
              </pre>
            </Paragraph>
          </Col>
        </Row>
        <br/>
        <br/>
        <br/>
        <Row>
          <Col span={6}>
            <SearchField onSearch={onSearch} />
            <BreedSelector onFinish={onFinish} />

          </Col>
          <Col span={18}>
            <AdoptionGrids animals={animals} />
            {animals.length == 0? <p>No result, please select other breed.</p>: <p></p>}
          </Col>
        </Row>
        </>
    }
      </main>
    );
  }