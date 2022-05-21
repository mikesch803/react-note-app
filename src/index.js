import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ArchiveProvider,
  AuthProvider,
  FilterProvider,
  NoteProvider,
  TrashProvider,
} from "./context";
// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
        <TrashProvider>
          <ArchiveProvider>
            <NoteProvider>
              <FilterProvider>
                <AuthProvider>
                  <App />
                </AuthProvider>
              </FilterProvider>
            </NoteProvider>
          </ArchiveProvider>
        </TrashProvider>
    </Router>
  </React.StrictMode>
);
