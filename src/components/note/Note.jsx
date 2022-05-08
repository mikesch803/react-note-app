import React from "react";
import {
  ArchiveIcon,
  EditIcon,
  PinLineIcon,
  TrashIcon,
} from "../../assests/icons/icons";
import { useAuthContext, useNoteContext } from "../../context";
import "./Note.css";
export function Note({ notes, setEditNoteBtn }) {
  const { deleteNoteHandler, setNoteDetail, setEditNoteDetail } = useNoteContext();
  const { token } = useAuthContext();
  return (
    <>
      {notes.map((note) => (
        <li key={note._id} className="m-b-1">
          <div
            className="note-container"
            style={{ backgroundColor: note.cardColor }}
          >
            <h3 className="note-title">
              {note.title}

              <span className="note-pin ft-grey">
                <PinLineIcon />
              </span>
            </h3>
            <p className="note-content">{note.desc}</p>
            <div className="note-footer">
              <div className="note-date">
                Created on {new Date().toLocaleDateString()}
                <span className="note-chip">{note.priority}</span>
                <span className="note-chip">{note.tags}</span>
              </div>
              <div className="note-icons ft-grey">
                <span onClick={()=> { setEditNoteDetail(note); setNoteDetail(note); setEditNoteBtn(true) } }>
                  <EditIcon />
                </span>
                <span>
                  <ArchiveIcon />
                </span>
                <span onClick={() => deleteNoteHandler(note, token)}>
                  <TrashIcon />
                </span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </>
  );
}
