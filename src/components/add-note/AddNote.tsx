import { useState } from "react";
import { ColorPlallateIcon } from "../../assests/icons";
import { useAuthContext, useNoteContext } from "../../context";
import { colorPlallateData } from "../../data/color-pallate-data";
import { priorityData, tagsData } from "../../data/filter-data";
import "./AddNote.css";
import { AddNoteProps } from "./AddNote.types";

export function AddNote({ editNoteBtn, setEditNoteBtn }: AddNoteProps) {
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
        rows={5}
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
        >
          <option hidden>Priority</option>
          {priorityData.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
        <select
          className="select-option"
          onChange={(e) =>
            setNoteDetail({ ...noteDetail, tags: e.target.value })
          }
        >
          <option hidden>Tags</option>
          {tagsData.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
        <div
          className="color-plallate"
          onMouseEnter={() => setHideColorPlallate(!hideColorPlallate)}
          onMouseLeave={() => setHideColorPlallate(!hideColorPlallate)}
        >
          <ColorPlallateIcon />
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
              editNoteHandler(noteDetail, editNoteDetail._id, token);
              setEditNoteBtn(false);
            }}
          >
            update
          </button>
        ) : (
          <button
            className="btn btn-primary btn-add"
            type="submit"
            onClick={() => addNoteHandler(noteDetail, token)}
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
}
