import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Home,
  LandingPage,
  Login,
  RequireAuth,
  Signup,
  WithHeader,
} from "./pages";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<WithHeader />}>
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<Home />} />
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
