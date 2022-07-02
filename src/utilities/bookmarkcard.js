import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { 
    useNavigate,
   } from "react-router-dom";
import { Card, Button } from 'antd';
import { dateToString } from './formatting';
import { WomanOutlined, ManOutlined, CloseOutlined, CheckOutlined, StopOutlined, DownloadOutlined } from '@ant-design/icons';

export default ({bookmark, handleRemove}) => {
    let navigate = useNavigate();

    return (
        <Card 
            title={bookmark.name}
            actions={[
                <Button type="primary" shape="round" onClick={() => navigate("/adoption/" + bookmark.animal_id)} icon={<DownloadOutlined />} size="large">Go To Detail</Button>,
                <Button  danger type="primary" shape="round" onClick={() => handleRemove(bookmark.id)} icon={<StopOutlined />} size="large" >Remove form Bookmark</Button>,
              ]}
              >
                <Card.Grid style={{ width: '25%'}}><img width="250" height="250" style={{ objectFit: "cover"}} src={`http://127.0.0.1:8887${bookmark.image_url}`}/></Card.Grid>
                <Card.Grid style={{ width: '75%'}}>
                <p>Number: {bookmark.animal_id}</p>
                <p>Birthday: {dateToString(bookmark.birthday)}</p>
                <p>Gender: {bookmark.gender? bookmark.gender == "Male"? <ManOutlined style={{ color:"#2f96eb" }} /> : <WomanOutlined style={{ color:"#eb2f96" }} /> : "N/A"} </p>
                <p>Is Neutered: {bookmark.isneutered? <CheckOutlined style={{ color:"#00ff04" }} /> : <CloseOutlined style={{ color:"#ff1000" }} />} </p>
                <p>Note: {bookmark.note}</p>
                </Card.Grid>
        </Card>
  )
  };