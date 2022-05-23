import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Button } from 'antd';
import { dateToString } from '../common/formatting';
import { CloseOutlined, CheckOutlined, WomanOutlined, ManOutlined, LoadingOutlined, DownloadOutlined, StopOutlined, EditOutlined } from '@ant-design/icons';
import http from '../common/http-common';
import { useLocalStorage } from "../common/useLocalStorage";

  export default function AdoptionCard({animal_id}) {

    let navigate = useNavigate();
    const [id, setId] = useLocalStorage("id", false);
    const [name, setName] = useLocalStorage("name", false);
    const [password, setPassword] = useLocalStorage("password", false);
    const [isAdmin, setIsAdmin] = useLocalStorage("isAdmin", false);
    const [ isBookmarked, setIsBookmarked ] = useState(false);
    const [ bookmarkId, setBookmarkId ] = useState();
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null)
    const [ animal, setAnimal ] = useState(null);
    
    useEffect(() => {
      //animal detail
      http.get('animals/' + animal_id )
        .then(({status, data, message})=> {
          if (status === 200) {
            console.log(data)
            setAnimal(data)
          } else {
            setError(message)
          }
        })
        .catch((error) => {
            console.log(error);
            setError(error)
          })
          .then(()=> {
            setLoading(false)
          })
      if (name) {
        http.get('bookmarks/' + id + '/' + animal_id)
        .then((res)=> {
          console.log("res ", res)
          if (res.data.length > 0) {
            setIsBookmarked(true)
            setBookmarkId(res.data[0].id)
          } else {
            setIsBookmarked(false)
          }
        })
      }
      }, [])

const handleRemoveBookmark = () => {
  setLoading(true)
  http.delete('bookmarks/' + bookmarkId,{
    auth: {
      username: name,
      password: password
    }})
    .then((res)=> {
      setIsBookmarked(false)
      setLoading(false)
    })
}

const handleBookmark = () => {
  setLoading(true)
  http.post('bookmarks/',{
    "user_id": id,
    "animal_id": animal.id
  },{
    auth: {
      username: name,
      password: password
    }})
    .then((res)=> {
      setIsBookmarked(true)
      setLoading(false)
    })
}
const goToUpdateAnimal =() => {
  navigate("/update_animal/" + animal.id)
}

const goToDeleteAnimal =() => {
  navigate("/Delete_animal/" + animal.id)
}
      return (
      <main style={{ padding: "1rem", display: "flex", justifyContent: "center", alignItems: "center"}}>
      {!loading && animal &&
          <Card 
            title="About Me"
            style={{ width: 450 }}
            cover={
              animal.image_url?
              <img width="auto" height="auto" style={{ objectFit: "cover"}} src={`http://127.0.0.1:8887${animal.image_url}`}/>
              : <div style={{ width: 800, height: 800, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f3f2f2" }}><LoadingOutlined /></div>
            }
            actions={name &&[
              <Button onClick={handleRemoveBookmark} danger disabled={!isBookmarked} type="primary" shape="round" icon={<StopOutlined />} size="large" >Remove form Bookmark</Button>,
              <Button onClick={handleBookmark} disabled={isBookmarked} type="primary" shape="round" icon={<DownloadOutlined />} size="large" >Bookmark</Button>,
            ]}
            >
            <Card.Meta
              // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={`Name: ${animal.name}`}
              description={
              <>
                <p>Number: {animal.id}</p>
                
                <p>Birthday: {dateToString(animal.birthday)}</p>
                <p>Gender: {animal.gender? animal.gender == "Male"? <ManOutlined style={{ color:"#2f96eb" }} /> : <WomanOutlined style={{ color:"#eb2f96" }} /> : "N/A"}  </p>
                <p>Is Neutered: {animal.isneutered? <CheckOutlined style={{ color:"#00ff04" }} /> : <CloseOutlined style={{ color:"#ff1000" }} />} </p>
                <p>Breed: {animal.breed_name}</p>
                <p>Note: {animal.note}</p>
                {isAdmin && <Button type="dashed" danger onClick={goToUpdateAnimal} shape="round" icon={<EditOutlined />} size="large" >Update Info</Button>}
                {isAdmin && <Button type="dashed" danger onClick={goToDeleteAnimal} shape="round" icon={<EditOutlined />} size="large" >Delete Dog</Button>}
              </>
              }
            />
          </Card>
        }
      </main>
    );
  }