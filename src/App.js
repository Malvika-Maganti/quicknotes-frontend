import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Update the URL to point to your deployed backend
  const BASE_URL = "https://your-service-name.onrender.com";

  const fetchNotes = async () => {
    const response = await axios.get(`${BASE_URL}/notes`);
    setNotes(response.data);
  };

  const addNote = async (e) => {
    e.preventDefault();
    await axios.post(`${BASE_URL}/notes`, { title, content });
    fetchNotes();
    setTitle("");
    setContent("");
  };

  const deleteNote = async (id) => {
    await axios.delete(`${BASE_URL}/notes/${id}`);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Quick Notes</h1>
      <form onSubmit={addNote}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Add Note</button>
      </form>

      <h2>Your Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
