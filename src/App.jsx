import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import User from "./components/User/User";
import Quiz from "./components/Quiz/Quiz";

function App() {


  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/:id/:category" element={<Quiz />} />
      </Routes>
    </main>
  );
}

export default App;
