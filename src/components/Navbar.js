import React from 'react'

export const Navbar = ({keyword, onSearchChange}) => {
  return (
    <nav>
      <h2>Notes App</h2>
      <form>
        <input onChange={onSearchChange} type="text" placeholder="Search notes by title..." value={keyword}/>
      </form>
    </nav>
  )
}
