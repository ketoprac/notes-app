import React from 'react';

export const NoteItem = ({ id, title, body, archived, createdAt, onDelete, onArchive}) => {
  return (
    <div className="note-item" key={id}>
      <h3 className="note-title">{title}</h3>
      <p className="note-created-date">{createdAt}</p>
      <p className="note-body">{body}</p>
      <div className="button-wrapper">
      {archived ? <button onClick={() => onArchive(id)}className="archive-note-button">UNARCHIVE</button> : <button onClick={() => onArchive(id)} className="archive-note-button">ADD TO ARCHIVE</button>}
      <button onClick={() => onDelete(id)} className="delete-note-button">DELETE</button>
      </div>
    </div>
  )
}
