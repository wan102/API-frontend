import { useEffect, useState } from 'react';
import { Divider, Row, Col } from 'antd';
import http from '../utilities/http-common';
import BookmarksGrids from '../form/bookmarksgrids';
import { useLocalStorage } from "../utilities/useLocalStorage";

export default function Bookmarks() {
  const [id, setId] = useLocalStorage("id", false);
  const [name, setName] = useLocalStorage("name", false);
  const [password, setPassword] = useLocalStorage("password", false);

  const [ loading, setloading ] = useState(true);
  const [ error, setError ] = useState(null)
  const [ bookmarks, setBookmarks ] = useState(null);

  const handleRemove = (bookmark_id) => {
    setloading(true)
    http.delete('bookmarks/' + bookmark_id, {
      auth: {
        username: name,
        password: password
      }})
      .then(({status, data, message})=> {
        console.log(data)
        setBookmarks(bookmarks.filter((bk)=> bk.id !== bookmark_id))
      })
      .catch((error) => {
          console.log(error);
          setError(error)
        })
        .then(()=> {
          setloading(false)
        })
  }
  useEffect(() => {
    http.get('bookmarks/' + id)
      .then(({status, data, message})=> {
        if (status === 200) {
          console.log(data)
          setBookmarks(data)
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
            <Divider orientation="left"><h1>Favourites</h1></Divider>
            <h3>My bookmarks pages.</h3>
            
          </Col>
        </Row>
        {!loading && bookmarks &&
          <BookmarksGrids bookmarks={bookmarks} handleRemove={handleRemove}/>
        }
      </main>
    );
  }