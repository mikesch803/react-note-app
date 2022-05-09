import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Archive,
  Home,
  LandingPage,
  Login,
  RequireAuth,
  Signup,
  Trash,
  WithHeader,
} from "./pages";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<WithHeader />}>
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<Home />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/trash" element={<Trash />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
