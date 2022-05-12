import React, { useState } from "react";
import { Aside, Note } from "../../components";
import {   useTrashContext } from "../../context";
export function Trash() {
  const { trashNotes, emptyTrashHandler } = useTrashContext();
  const [editNoteBtn, setEditNoteBtn] = useState(false);
  return (
    <div className="page-layout">
      <Aside />
      <main className="main">
          <button className="btn btn-link" onClick={emptyTrashHandler}>Empty Trash</button>
        <ul>
          {trashNotes.map((note) => (
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
    </div>
  );
}