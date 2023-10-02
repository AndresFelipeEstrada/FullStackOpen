import "./App.css";
import { Routes, Route, Navigate, useMatch } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import Notes from "./components/Notes";
import Users from "./components/Users";
import Note from "./components/Note";
import Login from "./components/Login";

import { data } from "./db.json";
import { useState } from "react";

function App() {
  const [notes, setNotes] = useState(data);
  const [user, setUser] = useState(null);

  const login = (user) => setUser(user);
  const match = useMatch("/notes/:id");

  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null;

  return (
    <>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home notes={data} />} />
        <Route path="/notes" element={<Notes notes={data} />} />
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route path="/login" element={<Login onLogin={login} />} />
      </Routes>
    </>
  );
}

export default App;
