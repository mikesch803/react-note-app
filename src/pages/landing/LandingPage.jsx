import React from "react";
import { Link } from "react-router-dom";
import BoyIllustration from "../../assests/images/illustration.svg";
import "./LandingPage.css";
export function LandingPage() {
  return (
    <div className="landing-page">
      <main className="main-text">
        <Link to="/home">
          <h1>Note App</h1>
        </Link>
        <h2>
          Meet your modern <strong>Note taking App</strong>
        </h2>
        <p className="ft-grey">
          Manage your daily tasks and workflow in a modern way and boost your
          efficiency without any efforts
        </p>
        <Link to="/home">
          <button className="btn btn-primary">write a note</button>
        </Link>
      </main>
      <main className="main-img">
        <img src={BoyIllustration} alt="boy illustration" />
      </main>
    </div>
  );
}
