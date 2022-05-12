import React, { useEffect, useState } from "react";
import axios from "axios";
import { AddNote, Aside, Filter, Note } from "../../components";
import { useArchiveContext, useAuthContext, useFilterContext, useNoteContext } from "../../context";
import "./Home.css";
export function Home() {
  const { setNotes } = useNoteContext();
  const { addToArchiveHandler} = useArchiveContext();
  const { getFilteredNotes } = useFilterContext();
  console.log(getFilteredNotes)
  const { token } = useAuthContext();
  const [editNoteBtn, setEditNoteBtn] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/notes", {
          headers: {
            authorization: token,
          },
        });
        if (response.status === 200) {
          setNotes(response.data.notes);
        }
        console.log(response.data.notes)
      } catch (err) {
        console.error(err);
      }
    })();
  }, [setNotes, addToArchiveHandler, token]);
  return (
    <div className="page-layout">
      <Aside />
      <main className="main">
        <AddNote editNoteBtn={editNoteBtn} setEditNoteBtn={setEditNoteBtn} />
        <ul>
          {getFilteredNotes.map((note) => (
            <li key={note._id} className="m-b-1">
              <Note
                note={note}
                editNoteBtn={editNoteBtn}
                setEditNoteBtn={setEditNoteBtn}
              />
            </li>
          ))}
        </ul>
      </main>
      <aside className="filter"><Filter/></aside>
    </div>
  );
}
