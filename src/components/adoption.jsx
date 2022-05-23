import { Divider, Row, Col } from 'antd';
import AdoptionGrids from '../form/adoptiongrids';
import BreedSelector from '../common/breedselector';
import SearchField from '../common/searchfield';
import { useEffect, useState } from 'react';
import http from '../common/http-common';

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
            <Divider orientation="left"><h1>Animals for Adoption</h1></Divider>
            <h3>One adoption saves two lives. Every time a lucky animal leaves our adoption center, a place will be vacated so that another animal can wait in the center to find a new home!</h3>
          </Col>
        </Row>
        <BreedSelector onFinish={onFinish} />
        <SearchField onSearch={onSearch} />
        <AdoptionGrids animals={animals} />
        {animals.length == 0? <p>No result, please select other breed.</p>: <p></p>}
        </>
    }
      </main>
    );
  }