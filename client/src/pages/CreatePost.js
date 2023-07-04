import React from 'react'
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {

  let navigate = useNavigate();

    const initialValues = {
        title: "",
        postText: "",
        username: "",
    };

    const validationSchema = Yup.object().shape({
      title: Yup.string().required('You must input a title'),
      postText: Yup.string().required(),
      username:Yup.string().min(3).max(15).required(),
    });

    const onSubmit = (data) => {
      //console.log(data);
      //function that runs on submittin
      axios.post("http://localhost:3001/posts", data).then((response) => {
      //console.log(response.data);
      //console.log("IT WORKEDDD!");
      navigate('/');
    });
    }

  return (
    <div className = "createPostPage"><Formik initialValues={initialValues} onSubmit = { onSubmit } validationSchema = {validationSchema}>
        <Form className='formContainer'>
            <label> Title: </label>
            <ErrorMessage name = "title" component = "span" />
            <Field 
            id = "inputCreatePost"
            name = "title"
            placeholder = "(Ex. TITLE...)" 
            /> 

<label> Content: </label>
<ErrorMessage name = "postText" component = "span" />
            <Field 
            id = "inputCreatePost"
            name = "postText"
            placeholder = "(Ex. xyz...)" 
            /> 

<label> Username: </label>
<ErrorMessage name = "username" component = "span" />
            <Field 
            id = "inputCreatePost"
            name = "username"
            placeholder = "(Ex. Andy...)" 
            /> 

            <button type = "submit">Create Post </button>
        </Form>

        </Formik></div>
  )
}

export default CreatePost