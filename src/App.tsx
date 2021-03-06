import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Archive,
  Home,
  LandingPage,
  Login,
  Profile,
  RequireAuth,
  Signup,
  Trash,
  WithHeader,
} from "./pages";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer } from "react-toastify";
import { NavbarBottom } from "./components";
function App() {
  if (typeof window !== "undefined") {
    injectStyle();
  }
  return (
    <div className="App">
      <Routes>
        <Route element={<WithHeader />}>
          <Route path="*" element={<Home />} />
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<Home />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/trash" element={<Trash />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <NavbarBottom />
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
