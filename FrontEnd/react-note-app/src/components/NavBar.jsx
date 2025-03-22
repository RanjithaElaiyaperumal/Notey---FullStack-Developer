import React, { useState, useEffect } from "react";
import { FaSquarePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);

  // Function to fetch search results
  const fetchSearchResults = async (query) => {
    if (query.trim() === "") {
      setFilteredNotes([]);
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/notes/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.json();
      setFilteredNotes(data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  // Debounce the search to prevent excessive API calls
  const handleSearchText = (text) => {
    setSearchText(text);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        fetchSearchResults(text);
      }, 500) // Adjust debounce delay as needed
    );
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary py-50" style={{ padding: "20px" }}>
        <div className="container d-flex justify-content-around">
          <Link className="navbar-brand" to="/">
            <h4 style={{ fontWeight: "bold" }}>Notey – Capture Ideas Anytime, Anywhere</h4>
          </Link>
          <div className="d-flex">
            <div className="input-group input-group-sm" style={{ width: "500px", height: "40px" }}>
              <input
                className="form-control"
                placeholder="Search"
                value={searchText}
                onChange={(e) => handleSearchText(e.target.value)}
              />
              <button className="btn btn-outline-success" type="button">
                Search
              </button>
            </div>
          </div>
          <Link to="/add-note" style={{ textDecoration: "none" }}>
            <button className="btn btn-outline-primary btn-md" type="button">
              <FaSquarePlus className="me-2 fs-6" /> Add Notes
            </button>
          </Link>
        </div>
      </nav>

      {/* Display search results */}
      <div className="container mt-4">
        {searchText && (
          <>
            <h5>Search Results:</h5>
            {filteredNotes.length > 0 ? (
              <ul className="list-group">
                {filteredNotes.map((note) => (
                  <li key={note.id} className="list-group-item">
                    <Link to={`/note/${note.id}`} className="text-decoration-none">
                      {note.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No matching notes found.</p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default NavBar;








