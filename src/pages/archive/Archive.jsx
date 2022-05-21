import React, { useEffect, useState } from "react";
import axios from "axios";
import { Aside, Note, SearchBar } from "../../components";
import { useArchiveContext, useAuthContext } from "../../context";
import { useTitle } from "../../hooks/useTitle";
export function Archive() {
  const { archives, setArchives, unArchiveHandler} = useArchiveContext();
  const { token } = useAuthContext();
  const [editNoteBtn, setEditNoteBtn] = useState(false);
  
  useTitle("Archive")
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/archives", {
          headers: {
            authorization: token,
          },
        });
        if (response.status === 200) {
          setArchives(response.data.archives);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [setArchives, unArchiveHandler, token]);
  return (
    <div className="page-layout">
      <Aside />
      <main className="main">
        <SearchBar/>
        <ul>
          {archives.map((note) => (
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