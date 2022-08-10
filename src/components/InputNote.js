import React from 'react';

export const InputNote = ({onSubmit, title, body, onTitleChange, onBodyChange, titleCount}) => {

  return (
    <form className="note-form" onSubmit={onSubmit}>
      {/* <label htmlFor="title">Title: </label> */}
      <p className={titleCount > 50 ? "title-count red" : "title-count"}>Remaining characters: {50 - titleCount}</p>
      <input onChange={onTitleChange} value={title} type="text" placeholder="Input title..." />
      {/* <label htmlFor="body">Body: </label> */}
      <textarea onChange={onBodyChange} value={body} type="text" placeholder="Input contents..." />
      {titleCount > 50 ? 
        (<button className="add-note-button disabled" disabled>ADD NOTE</button>)
        : 
        (<button className="add-note-button">ADD NOTE</button>)
      }
    </form>
  )
}
