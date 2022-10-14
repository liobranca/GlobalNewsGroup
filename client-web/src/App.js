import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import SurveyCompleted from "./pages/SurveyCompleted";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<Home />} />
      <Route path="/completed" element={<SurveyCompleted />} />
    </Routes>
  );
}

export default App;
