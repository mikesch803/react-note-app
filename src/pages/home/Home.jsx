import React from "react";
import { Aside, Note } from "../../components";
import "./Home.css";
export function Home() {
  return (
    <div className="home-page">
      <Aside />
      <main className="home-main">
      <Note />
      </main>
    </div>
  );
}
