import React, { useEffect, useState } from "react";
import axios from "axios";
import { AddNote, Aside, Filter, Note, SearchBar } from "../../components";
import { useArchiveContext, useAuthContext, useFilterContext, useNoteContext } from "../../context";
import "./Home.css";
import { useTitle } from "../../hooks/useTitle";
export function Home() {
  const { setNotes } = useNoteContext();
  const { addToArchiveHandler} = useArchiveContext();
  const { getFilteredNotes } = useFilterContext();
  const { token } = useAuthContext();
  const [editNoteBtn, setEditNoteBtn] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/notes", {
          headers: {
            authorization: token??'',
          },
        });
        if (response.status === 200) {
          setNotes(response.data.notes);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [setNotes, addToArchiveHandler, token]);
 
  useTitle("Home")

const [filterModal, setFilterModal] = useState(false);


  return (
    <div className="page-layout">
      <Aside />
      <main className="main">
        <div className="row-container"><SearchBar/>
        <button className="btn btn-primary btn-filter" onClick={()=>setFilterModal(!filterModal)}>filter</button></div>
        <AddNote editNoteBtn={editNoteBtn} setEditNoteBtn={setEditNoteBtn} />
        <ul>
          {getFilteredNotes.map((note) => (
            <li key={note._id} className="m-b-1">
              <Note
                note={note}
                setEditNoteBtn={setEditNoteBtn}
              />
            </li>
          ))}
        </ul>
      </main>
      <aside className={filterModal?`filter-modal`:`filter`} onClick={()=>setFilterModal(!filterModal)}><Filter/></aside>
    </div>
  );
}
