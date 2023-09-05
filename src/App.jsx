import React from "react";
import User from "./components/User/User";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<User />} />
      </Routes>
    </main>
  );
}

export default App;
