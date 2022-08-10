import React, { useState } from "react";
import { InputNote } from "./components/InputNote";
import { NoteItem } from "./components/NoteItem";
import { Navbar } from "./components/Navbar";
import { getInitialData, showFormattedDate } from "./utils/index";
import Wrapper from "./components/Wrapper";
import NotesWrapper from "./components/NotesWrapper";
import Footer from "./components/Footer";
import EmptyNotes from "./components/EmptyNotes";
import Swal from 'sweetalert2'

export default function NotesApp() {
  const [notes, setNotes] = useState(getInitialData());
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [keyword, setKeyword] = useState("");
  const [titleCount, setTitleCount] = useState(0);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const onTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleCount(e.target.value.length);
  };

  const onBodyChange = (e) => {
    setBody(e.target.value);
  };

  const onSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  const note = {
    id: +new Date(),
    title,
    body,
    archived: false,
    createdAt: +new Date(),
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (title === "" || body === "") {
      return Swal.fire({
        text: "Please input the title and content!",
        icon: "info"
      });
    }
    const newNotes = [...notes, note];
    setNotes(newNotes);
    setTitle("");
    setBody("");
    setTitleCount(0);

  
    Toast.fire({
      icon: 'success',
      title: 'Note successfully added!'
    })
  };

  const deleteHandler = (id) => {
    Swal.fire({
      icon: "question",
      text: "Are you sure want to delete this note?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: '#D61C4E',
    }).then((result) => {
      if(result.isConfirmed) {
        setNotes((notes) => notes.filter((note) => note.id !== id));
      
        Toast.fire({
          icon: 'success',
          title: 'Note successfully deleted!'
        })
      } else {
        return null;
      }
    })
  };

  const archiveHandler = (id) => {
    setNotes((notes) =>
      notes.map((note) => {
        if (note.id === id && note.archived === false) {
          return { ...note, archived: true };
        } else if (note.id === id && note.archived === true) {
          return { ...note, archived: false };
        }
        return note;
      })
    );
    Toast.fire({
      title: "Success!",
      icon: "success"
    })
  };

  const checkNotes = () => {
    if (notes.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <Navbar onSearchChange={onSearchChange} keyword={keyword} />
      <Wrapper>
        <h2>Add Notes</h2>
        <InputNote
          onSubmit={submitHandler}
          onTitleChange={onTitleChange}
          onBodyChange={onBodyChange}
          titleCount={titleCount}
          title={title}
          body={body}
        />

        <h2>Active Notes</h2>
        <NotesWrapper>
          {checkNotes() ? (
            notes
              .filter((note) => {
                if (keyword) {
                  return (note.title
                    .toLowerCase()
                    .includes(keyword.toLowerCase())) && note.archived === false;
                }
                return note.archived === false;
              })
              .map((note) => (
                <NoteItem
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  body={note.body}
                  archived={note.archived}
                  createdAt={showFormattedDate(note.createdAt)}
                  onDelete={deleteHandler}
                  onArchive={archiveHandler}
                />
              ))
          ) : (
            <EmptyNotes />
          )}
        </NotesWrapper>

        <h2>Archived Notes</h2>
        <NotesWrapper>
          {checkNotes() ? (
            notes
              .filter((note) => {
                if (keyword) {
                  return (note.title
                    .toLowerCase()
                    .includes(keyword.toLowerCase())) && note.archived === true;
                }
                return note.archived === true;
              })
              .map((note) => (
                <NoteItem
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  body={note.body}
                  archived={note.archived}
                  createdAt={showFormattedDate(note.createdAt)}
                  onDelete={deleteHandler}
                  onArchive={archiveHandler}
                />
              ))
          ) : (
            <EmptyNotes />
          )}
        </NotesWrapper>
      </Wrapper>
      <Footer />
    </>
  );
}
