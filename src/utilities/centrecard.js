import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Card, Avatar } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const { Meta } = Card;

export default ({centre}) => {

    return (
        <Card title={centre.name}>
            <Card.Grid style={{ width: '25%'}}><img width="250" height="250" style={{ objectFit: "cover"}} src={centre.image_url}/></Card.Grid>
            <Card.Grid style={{ width: '75%'}}>
            <p>Number: {centre.id}</p>
            <p>Tel: {centre.tel}</p>
            <p>Location: {centre.address}</p>
            <p>Detail: {centre.note}</p>
            </Card.Grid>
        </Card>

  )
  };