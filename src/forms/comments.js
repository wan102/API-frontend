import { useState, useEffect } from 'react';
import { Comment, List, Divider, Button} from 'antd';
import http from '../common/http-common';
import NewCommentCard from '../common/newcommentcard';
import { useLocalStorage } from "../common/useLocalStorage";

export default ({animal_id}) => {
    const [name, setName] = useLocalStorage("name", false);
    const [isAdmin, setIsAdmin] = useLocalStorage("isAdmin", false);
    const [password, setPassword] = useLocalStorage("password", false);
    const [newCommentLoading, setNewCommentLoading] = useState(false);
    const [loading, setLoading] = useState();
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState();

    const getComments=() => {
        setLoading(true)
        // get comments
        http.get('comments/' + animal_id )
            .then(({status, data, message})=> {
              console.log(data)
                setComments(data)
                setNewCommentLoading(false)

            })
            .then(()=>setLoading(false))
    }
    useEffect(() => {
        getComments()
        },[])

    const handleSubmit = (values) => {
        values.animal_id = parseInt(animal_id)
        if (!name) {
            values.user_name = values.user_name + "(Visitor)"
        }
        setNewCommentLoading(true)
        http.post('comments/', {...values}
        ).then((res)=> {
            getComments()
            window.location.reload(false);
        })
    }
    const deleteComment = (comment_id) => {
        http.delete('comments/' + comment_id,{
            auth: {
              username: name,
              password: password
            }})
            .then((res)=> {
                setComments(comments.filter(
                    (comment) => comment.id !== comment_id
                  ))
            })
    }
    return (
        <>
            <h2>Comments</h2>
            <Divider />
            {!loading && comments && 
                <List
                className="comment-list"
                header={`${comments.length} replies`}
                itemLayout="horizontal"
                dataSource={comments}
                renderItem={item => (
                <li>
                    <Comment
                    actions={isAdmin && [
                        <Button onClick={()=> deleteComment(item.id)} type="dashed" danger>
                            Delete
                        </Button>  
                        
                    ]}
                    author={item.user_name}
                    avatar={'https://joeschmoe.io/api/v1/abc'}
                    content={item.comment}
                    datetime={item.datetime}
                    />
                </li>
                )}
            />
            }
            {!loading && comments.length == 0 &&
            "Leave the first comment here!"
            }
            <NewCommentCard isAdmin={isAdmin} comment={comment} onSubmit={handleSubmit} name={name} handleSubmit={handleSubmit} loading={newCommentLoading}/>
        </>
    )
}