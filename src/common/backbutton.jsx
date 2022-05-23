import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Button } from "antd"
import { RollbackOutlined } from '@ant-design/icons'

const BackBtn = () => {
  const navigate = useNavigate()
  return <Button icon={<RollbackOutlined />} onClick={() => navigate(-1)} >Back</Button>
}
export default BackBtn