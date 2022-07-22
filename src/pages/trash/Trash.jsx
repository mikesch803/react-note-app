import { useState } from "react";
import { Aside, Note, SearchBar } from "../../components";
import { useTrashContext } from "../../context";
import { useTitle } from "../../hooks/useTitle";
export function Trash() {
  const { trashNotes, emptyTrashHandler } = useTrashContext();
  const [editNoteBtn, setEditNoteBtn] = useState(false);

  useTitle("Trash");
  return (
    <div className="page-layout">
      <Aside />
      <main className="main">
        <button className="btn btn-link" onClick={emptyTrashHandler}>
          Empty Trash
        </button>
        <SearchBar />
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
