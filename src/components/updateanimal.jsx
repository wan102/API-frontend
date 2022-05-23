import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewcomerForm from '../form/newcomer'
import BreedSearch from './breedsearch'
import { Row, Col } from 'antd';
import http from '../common/http-common';

export default function UpdateAnimal() {
  let params = useParams();

  const [ animal, setAnimal ] = useState(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    //animal detail
    http.get('animals/' + params.animalId )
      .then(({status, data, message})=> {
        if (status === 200) {
          setAnimal(data)
        } else {
          console.log(message);
        }
      })
      .catch((error) => {
          console.log(error);
        })
        .then(()=> {
          setLoading(false)
        })
      },[]);
      
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Update Animal</h2>
        {!loading && 
          <Row>
            <Col span={12}><NewcomerForm animal={animal} /></Col>
            <Col span={12}><BreedSearch /></Col>
          </Row>
        }
      </main>
    );
  }