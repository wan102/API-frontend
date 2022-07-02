import React from 'react';
import { useNavigate } from "react-router-dom";
import { Divider, Row, Col, Typography } from 'antd';

import 'antd/dist/antd.css';
import '../index.css';
import { Card, Avatar } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { WomanOutlined, ManOutlined } from '@ant-design/icons';

export default ({animal}) => {
  let navigate = useNavigate();
  
  let birth = animal.birthday? new Date(animal.birthday).toISOString().split('T')[0] : ""
  return (
    <Row>
      <Col span={6}>
        <Card
          onClick={() => {
            navigate("/adoption/" + animal.id);
          }}
          style={{width: 200, margin: "auto"}}
          hoverable={true}
          cover={
            animal.image_url?
              <img width="200" height="200" style={{ objectFit: "cover"}} src={`http://127.0.0.1:8887${animal.image_url}`}/>
              : <div style={{ width: 200, height: 200, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f3f2f2" }}><LoadingOutlined /></div>
          }
        >
          <Card.Meta
            title={`${animal.name}`}
          />
      </Card>
      </Col>
      <Col span={18}>
        <p>Birthday: {birth}</p>
        <p>Location: {animal.centre_name}</p>
        <p>Gender: {animal.gender? animal.gender == "Male"? <ManOutlined style={{ color:"#2f96eb" }} /> : <WomanOutlined style={{ color:"#eb2f96" }} /> : "N/A"}  </p>
        <p>Breed: {animal.breed_name}</p>
      </Col>
    </Row>
  )
  };