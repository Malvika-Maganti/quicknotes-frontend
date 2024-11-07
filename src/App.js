// frontend/src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css'; // Importing CSS for styling

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showNotes, setShowNotes] = useState(false); // State to manage notes visibility

  const fetchNotes = async () => {
    const response = await axios.get("http://localhost:5000/notes");
    setNotes(response.data);
  };

  const addNote = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/notes", { title, content });
    fetchNotes();
    setTitle("");
    setContent("");
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/notes/${id}`);
    fetchNotes();
  };

  const toggleNotesVisibility = () => {
    setShowNotes(!showNotes); // Toggle visibility
    if (!showNotes) {
      fetchNotes(); // Fetch notes only when showing
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-title">Quick Notes</h1>
      <form className="note-form" onSubmit={addNote}>
        <input
          className="note-input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="note-textarea"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button className="submit-button" type="submit">Add Note</button>
      </form>

      <button className="view-button" onClick={toggleNotesVisibility}>
        {showNotes ? "Hide Notes" : "View Notes"}
      </button>

      {showNotes && (
        <div>
          <h2 className="notes-title">Your Notes</h2>
          <ul className="notes-list">
            {notes.map((note) => (
              <li className="note-item" key={note._id}>
                <h3 className="note-title">{note.title}</h3>
                <p className="note-content">{note.content}</p>
                <button className="delete-button" onClick={() => deleteNote(note._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
