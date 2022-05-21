import React from "react";
import { Link } from "react-router-dom";
import BoyIllustration from "../../assests/images/illustration.svg";
import logo from "../../assests/images/logo.png"
import { useTitle } from "../../hooks/useTitle";
import "./LandingPage.css";
export function LandingPage() {
  useTitle("Landing Page")
  return (
    <div className="landing-page">
      <main className="main-text">
        <Link to="/home">
          <h1>Note App <img src={logo} alt="logo" width={100} height={100}/></h1>
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
        <img src={BoyIllustration} alt="boy illustration" 
        className="responsive"/>
      </main>
    </div>
  );
}
