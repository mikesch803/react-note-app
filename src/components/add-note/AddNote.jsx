import React, { useState } from "react";
import { IcBaselineColorLens } from "../../assests/icons/icons";
import { useAuthContext, useNoteContext } from "../../context";
import { colorPlallateData } from "../../data/color-pallate-data";
import "./AddNote.css";
export function AddNote({ editNoteBtn, setEditNoteBtn }) {
  const { token } = useAuthContext();
  const {
    noteDetail,
    setNoteDetail,
    editNoteDetail,
    addNoteHandler,
    editNoteHandler,
  } = useNoteContext();
  const [hideColorPlallate, setHideColorPlallate] = useState(true);
  return (
    <div
      className="textfield"
      style={{ backgroundColor: noteDetail.cardColor }}
    >
      <input
        type="text"
        className="textfield-title"
        placeholder="title"
        onChange={(e) =>
          setNoteDetail({ ...noteDetail, title: e.target.value })
        }
        value={noteDetail.title}
      />
      <textarea
        className="textfield-content"
        rows="5"
        placeholder="take a note..."
        onChange={(e) => setNoteDetail({ ...noteDetail, desc: e.target.value })}
        value={noteDetail.desc}
      ></textarea>
      <div className="textfield-options">
        <select
          className="select-option"
          onChange={(e) =>
            setNoteDetail({ ...noteDetail, priority: e.target.value })
          }
          value={noteDetail.priority}
        >
          <option hidden>Priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select
          className="select-option"
          onChange={(e) =>
            setNoteDetail({ ...noteDetail, tags: e.target.value })
          }
          value={noteDetail.tags}
        >
          <option hidden>Tags</option>
          <option>Home</option>
          <option>Work</option>
          <option>Health</option>
          <option>Team</option>
          <option>Chores</option>
        </select>
        <div
          className="color-plallate"
          onMouseEnter={() => setHideColorPlallate(!hideColorPlallate)}
          onMouseLeave={() => setHideColorPlallate(!hideColorPlallate)}
        >
          <IcBaselineColorLens />
          <div
            className="color-plallate-options"
            style={{ display: hideColorPlallate ? "none" : "flex" }}
          >
            {colorPlallateData.map((bgColor) => (
              <div
                className="color-plallate-child"
                style={{ backgroundColor: bgColor }}
                key={bgColor}
                onClick={() => {
                  setNoteDetail({ ...noteDetail, cardColor: bgColor });
                }}
              ></div>
            ))}
          </div>
        </div>
        {editNoteBtn ? (
          <button
            className="btn btn-primary btn-add"
            type="submit"
            onClick={() => {
              if (noteDetail.title !== "" && noteDetail.desc !== "") {
                editNoteHandler(noteDetail, editNoteDetail._id, token);
                setNoteDetail({
                  title: "",
                  desc: "",
                  priority: "Low",
                  tags: "Home",
                  cardColor: "var(--BG-BODY)",
                });
                setEditNoteBtn(false);
              }
            }}
          >
            update
          </button>
        ) : (
          <button
            className="btn btn-primary btn-add"
            type="submit"
            onClick={() => {
              if (noteDetail.title !== "" && noteDetail.desc !== "")
                addNoteHandler(noteDetail, token);
              setNoteDetail({
                title: "",
                desc: "",
                priority: "Low",
                tags: "Home",
                cardColor: "var(--BG-BODY)",
              });
            }}
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
}
