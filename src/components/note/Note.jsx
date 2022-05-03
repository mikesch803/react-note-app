import React from "react";
import {
  ArchiveIcon,
  ColorPalleteIcon,
  LabelIcon,
  PinLineIcon,
  TrashIcon,
} from "../../assests/icons/icons";
import "./Note.css";
export function Note() {
  return (
    <div className="note-container">
      <h2 className="note-title">
        Title of note
        <span className="note-pin ft-grey">
          <PinLineIcon />
        </span>
      </h2>
      <p className="note-content">content of note</p>
      <div className="note-footer">
        <div className="note-date">Created on 02/05/2022</div>
        <div className="note-icons ft-grey">
          <span>
            <ColorPalleteIcon />
          </span>
          <span>
            <LabelIcon />
          </span>
          <span>
            <ArchiveIcon />
          </span>
          <span>
            <TrashIcon />
          </span>
        </div>
      </div>
    </div>
  );
}
