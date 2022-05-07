import React from "react";
import { Aside, Note } from "../../components";
import { TextField } from "../../components/textfield/TextField";
import "./Home.css";
export function Home() {
  return (
    <div className="home-page">
      <Aside />
      <main className="home-main">
        <TextField/>
      <Note />
      </main>
    </div>
  );
}
