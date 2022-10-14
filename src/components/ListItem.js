import {Link}  from 'react-router-dom';
import React from 'react'

const ListItem = ({note}) => {

  let getTime = (note) => {
    return new Date(note).toLocaleDateString()
  }

  let getTitle = (note) => {
    let title = note.body.split('\n')[0]
    if(title.length > 45){
      return title.slice(0, 45)
    }
    return title
  }
  let getContent = (note) => {
    let title = getTitle(note)
    let content = note.body.replaceALl('\n', ' ')
    content = content.replaceALl(title, '')
    
    if(content.length > 45){
      return content.slice(0, 45) + '...'
    }else{
      return content
    }
  }
  return (
    <Link to={`note/${note.id}`}>
      <div className='notes-list-item'>
        <h3>{note.body.slice(0,16)}...</h3>
        <u><b>Created : {getTime(note.created)}</b></u>&nbsp;&nbsp;&nbsp;
        <u><b>Updated : {getTime(note.updated)}</b></u>
      </div>
    </Link>
  )
}

export default ListItem