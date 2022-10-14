import React, { useEffect, useState } from 'react'
import { useParams,Link } from "react-router-dom"
import {ReactComponent as ArrowlLeft} from '../assets/arrow-left.svg';
const NotePage = ({history}) => {
  const [note, setNote] = useState(null);
  const {id} = useParams();

  useEffect(()=>{
    console.log("called")
    getNote();
  },[id])

  let getNote = async () => {
    if(id === "new") return
    let response = await fetch(`/api/notes/${id}`);
    let data = await response.json();
    setNote(data);
  }
  
  let updateNote = async () => {
    fetch(`/api/notes/${id}/update`, {
      method : "PUT", 
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({body : note.body})
  })
  }

  let createNote = async () => {
    fetch(`/api/notes/create`, {
      method : "POST", 
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(note)
  })
  }

  let handleDeleteNote = async () => {
    fetch(`/api/notes/${id}/delete`, {
      method:"DELETE",
      headers:{
        'Content-Type': 'application/json'
      }
    })
  }
  let handleSubmit = (e) => {
    console.log("test = ", note)
    if(id != "new" && note.body === ''){
      handleDeleteNote();
    }else if(id !== "new"){
      updateNote();
    }else if(id == "new" && note.body !== null){
      createNote()
    }
    // history.push('/');
  }
  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to="/">
            <ArrowlLeft onClick={handleSubmit}/>
          </Link>
        </h3>
          {id !== 'new' ? (<Link to="/">
            <button onClick={handleDeleteNote} text="DELETE">Delete</button>
          </Link>)
          : (
            <Link to="/">
            <button onClick={handleSubmit}>Done</button>
          </Link>
          )  
        }
          
      </div>
      <textarea onChange={(e) => {setNote({...note, body:e.target.value})}} value={note?.body}>
      </textarea>
    </div>
  )
}

export default NotePage