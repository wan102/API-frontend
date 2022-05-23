import { useEffect, useState } from 'react';
import { Divider, Row, Col } from 'antd';
import http from '../common/http-common';
import BookmarksGrids from '../form/bookmarksgrids';
import { useLocalStorage } from "../common/useLocalStorage";

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
            <Divider orientation="left"><h1>My favourites</h1></Divider>
            <h3>My favourites pages. You can see all of your favourites in here.</h3>
            
          </Col>
        </Row>
        {!loading && bookmarks &&
          <BookmarksGrids bookmarks={bookmarks} handleRemove={handleRemove}/>
        }
      </main>
    );
  }
  
  // import { NavLink, Outlet, useSearchParams } from "react-router-dom";
// import { getDogs } from "../data";
// import { QueryNavLink } from "../common/QueryNavLink";

// export default function Bookmarks() {
//   let dogs = getDogs();
//   let [searchParams, setSearchParams] = useSearchParams();

//   return (
//     <div style={{ display: "flex" }}>
//       <nav
//         style={{
//           borderRight: "solid 1px",
//           padding: "1rem",
//         }}
//       >
//         <input
//           value={searchParams.get("filter") || ""}
//           onChange={(event) => {
//             let filter = event.target.value;
//             if (filter) {
//               setSearchParams({ filter });
//             } else {
//               setSearchParams({});
//             }
//           }}
//         />
//         {dogs.filter((dog)=> {
//           let filter = searchParams.get("filter");
//           if (!filter) return true;
//           let name = dog.name.toLocaleLowerCase();
//           return name.startsWith(filter.toLocaleLowerCase());
//         })
//         .map((dog) => (
//           <QueryNavLink
//             style={({ isActive }) => {
//               return {
//                 display: "block",
//                 margin: "1rem 0",
//                 color: isActive ? "red" : "",     
//               };
//             }}
//             to={`/bookmarks/${dog.number}`}
//             key={dog.number}
//           >
//             {dog.name}
//           </QueryNavLink>
//         ))}
//       </nav>
//       <Outlet />
//     </div>
//   );
// }