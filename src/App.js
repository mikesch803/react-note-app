import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, LandingPage, WithHeader } from "./pages";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<WithHeader />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
