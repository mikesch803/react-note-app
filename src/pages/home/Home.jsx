import React, { useEffect, useState } from "react";
import axios from "axios";
import { AddNote, Aside, Note } from "../../components";
import { useAuthContext, useNoteContext } from "../../context";
import "./Home.css";
export function Home() {
  const { notes, setNotes } = useNoteContext();
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
      } catch (err) {
        console.error(err);
      }
    })();
  }, [setNotes, token]);
  return (
    <div className="home-page">
      <Aside />
      <main className="home-main">
        <AddNote
          editNoteBtn={editNoteBtn}
          setEditNoteBtn={setEditNoteBtn}
        />
        <Note
          notes={notes}
          editNoteBtn={editNoteBtn}
          setEditNoteBtn={setEditNoteBtn}
        />
      </main>
    </div>
  );
}
