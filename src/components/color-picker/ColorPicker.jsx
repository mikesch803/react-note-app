import React from "react";
import { useState } from "react";
import { IcBaselineColorLens } from "../../assests/icons/icons";
export function ColorPicker() {
  const [showColorPlallate, setShowColorPlallate] = useState(true);
  return (
    <div
      className="color-plallate"
      onMouseEnter={() => setShowColorPlallate(!showColorPlallate)}
      onMouseLeave={() => setShowColorPlallate(!showColorPlallate)}
    >
      <IcBaselineColorLens />
      <div
        className="color-plallate-options"
        style={{ display: showColorPlallate ? "none" : "flex" }}
      >
        <div className="color-plallate-child"></div>
        <div className="color-plallate-child"></div>
        <div className="color-plallate-child"></div>
        <div className="color-plallate-child"></div>
      </div>
    </div>
  );
}
