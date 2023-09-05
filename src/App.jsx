import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import User from "./components/User/User";
import Quiz from "./components/Quiz/Quiz";

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://quiz-7.com/categories.json")
      .then((response) => response.json())
      .then((data) => 
        setCategories(data));
  }, []);

  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<User categories={categories} />} />
        <Route path="/:category" element={<Quiz categories={categories} />} />
      </Routes>
    </main>
  );
}

export default App;
