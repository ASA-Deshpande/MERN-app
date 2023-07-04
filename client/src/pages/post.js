import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {
    let { id } = useParams(); //id is name of that parameter specified in url on line 18 app.js
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]); //for getting all existing comments
    const [newComment, setNewComment] = useState(""); //for a new comment

  useEffect(() => {
    //this one for actually getting the post
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
    setPostObject(response.data);
    //console.log(response);
    });

    //this one for getting the comments on a post
    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
    setComments(response.data);
    //console.log(response);
    });
  }, []);

  //this function for adding the comment, called onclicking the button
  const addComment = () => {
    //call the route
    axios.post(`http://localhost:3001/comments`, 
    {commentBody: newComment, postId: id},
    {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }
    )
    .then((response) => {
      //console.log("Successfully added comment");
      if (response.data.error){
        alert(response.data.error);
      }else{
      //then set commenttoadd with the newcomment, append it to the list of existing comments, also called restructuring ig
      const commentToAdd = {commentBody: newComment, username: response.data.username};
      setComments([...comments, commentToAdd]);
      setNewComment(""); //clearing the newcomment state again to clear that input field in frontend
      }

    } )
  }
    return (
    <div className='postPage'>
      <div className='leftSide'>
      <div className="post" id="individual">
        <div className='title'> {postObject.title} </div>
        <div className='postText'> {postObject.postText} </div>
        <div className='footer'> {postObject.username} </div>
        </div>
      </div>
      <div className='rightSide'>
        <div className='addCommentContainer'>
          <input type = "text" placeholder = "Comment..." autoComplete='off' value = {newComment} //refer line 36 of newcomment clearing
           onChange={(event) => setNewComment(event.target.value)} />
          <button onClick={addComment}> Add Comment </button>
        </div>

        <div className='listOfComments'>
          {comments.map((comment, key) => {
            return <div key = {key} className = 'comment'> {comment.commentBody} 
            <label> Username: {comment.username} </label>
            </div>
            
          })}
        </div>
      </div>
    </div>
  )
}

export default Post