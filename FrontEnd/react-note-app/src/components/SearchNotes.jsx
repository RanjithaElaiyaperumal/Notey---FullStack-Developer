
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchNotes = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (query.trim() === "") return;
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/notes/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search notes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          results.map((note) => (
            <li
              key={note.id}
              onClick={() => navigate(`/edit-note/${note.id}`)}
              style={{ cursor: "pointer" }}
            >
              {note.title} 
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SearchNotes;



















// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const SearchNotes = () => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const navigate = useNavigate();

//   const handleSearch = async () => {
//     if (query.trim() === "") return;
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/notes/search?q=${encodeURIComponent(query)}`);
//       const data = await response.json();
//       setResults(data);
//     } catch (error) {
//       console.error("Search error:", error);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search notes..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>

//       <ul>
//         {results.length === 0 ? (
//           <p>No results found.</p>
//         ) : (
//           results.map((note) => (
//             <li key={note.id} onClick={() => navigate(`/note/${note.id}`)} style={{ cursor: "pointer" }}>
//               {note.title}
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// };

// export default SearchNotes;




// import React from "react";
// import { Link } from "react-router-dom";

// const SearchNotes = ({ notes }) => {
//   return (
//     <div>
//       <h2>Search Results</h2>
//       {notes.length === 0 ? (
//         <p>No notes found.</p>
//       ) : (
//         <ul>
//           {notes.map((note) => (
//             <li key={note.id}>
//               <Link to={`/notes/${note.id}`}>{note.title}</Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SearchNotes;



