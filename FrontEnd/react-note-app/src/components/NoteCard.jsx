import React from "react";
import { MdMarkunread } from "react-icons/md";
import { FaNoteSticky } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FormatDate } from "./FormatDate";
import "./NoteCard.css"

const NoteCard = ({ note }) => {
  const body = `${note.body.split(" ").slice(0, 20).join(" ")} ...`;
  const color =
    note.category === "BUSINESS"
      ? "blue"
      : note.category === "PERSONAL"
      ? "green"
      : "purple";

  return (
    <div className="col-md-4">
      <div
        className="card shadow-sm rounded border-0 p-3 bg-light transition-all"
        style={{
          textTransform: "uppercase",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <span
          className="side-stick position-absolute start-0 top-0"
          style={{ backgroundColor: color, width: "5px", height: "100%" }}
        ></span>
        <div className="d-flex justify-content-between align-items-center">
          <FaNoteSticky className="fs-4" style={{ color: color }} />
          <span className="badge rounded-pill text-bg-light" style={{ color }}>
            {note.category}
          </span>
        </div>

        <Link to={`/notes/${note.id}`} className="text-decoration-none text-dark">
          <h5 className="note-title text-truncate w-75 mb-2">{note.title}</h5>
        </Link>

        <p className="note-date text-muted small">{FormatDate(note.updated)}</p>

        <div className="note-content">
          <p className="note-inner-content text-muted text-truncate">{body}</p>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <a href="/notes-detail" className="text-decoration-none">
            <MdMarkunread
              className="fs-5 me-2"
              style={{ cursor: "pointer", color }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;





