import React from "react";
import { ColorPicker } from "../color-picker/ColorPicker";
import "./TextField.css";
export function TextField() {
  return (
    <div className="textfield">
      <input type="text" className="textfield-title" placeholder="title" />
      <textarea
        className="textfield-content"
        rows="5"
        placeholder="take a note..."
      ></textarea>
      <div className="textfield-options">
        <select className="select-option" value="Priority">
          <option value="Priority" disabled selected>
            Priority
          </option>
          <option value="">Low</option>
          <option value="">Medium</option>
          <option value="">High</option>
        </select>
        <select className="select-option" value="Tags">
          <option value="Tags" disabled selected>
            Tags
          </option>
          <option value="">Home</option>
          <option value="">Work</option>
          <option value="">Health</option>
          <option value="">Team</option>
          <option value="">Chores</option>
        </select>
        <ColorPicker/>
        <button className="btn btn-primary btn-add">Add</button>
      </div>
    </div>
  );
}
