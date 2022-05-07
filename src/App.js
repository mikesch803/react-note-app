import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, LandingPage, Login, Signup, WithHeader } from "./pages";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<WithHeader />}>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
