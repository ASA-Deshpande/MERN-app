import React from 'react'
import axios from "axios";
import { useEffect, useState } from 'react' // import useEffect hook to run this funtion wen page re-renders
import { useHistory, useNavigate } from "react-router-dom";

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]); // setListOfPosts is function to change state, useState currently has empty array
  let navigate = useNavigate();
    useEffect(() =>{
    //the data that you get will be stored into the response parameter passed to the function
    axios.get("http://localhost:3001/posts").then((response) => {
      //console.log(response.data);
      setListOfPosts(response.data); //set the List of posts as the response.data so we have a state now with this data
    });
  }, []);
  return (
    <div>
        {listOfPosts.map((value, key) => {
      return <div className = "post" onClick={ () => {navigate(`/post/${value.id}`)}}>
                <div className = "title"> { value.title } </div>
                <div className = "body"> { value.postText } </div>
                <div className = "footer"> { value.username } </div>
              </div> //for each element in the list, return a div :)
    })}
    </div>
  )
}

export default Home