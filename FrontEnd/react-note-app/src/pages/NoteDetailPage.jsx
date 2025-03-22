import React, { useEffect, useState } from "react";
import { BiSolidTrashAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FormatDate } from "../components/FormatDate";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NoteDetailPage.css";

const NoteDetailPage = ({ deleteNote }) => {
  const [note, setNote] = useState({});
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleIsOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/notes/${id}/`) // Fixed URL syntax
      .then((res) => setNote(res.data))
      .catch((err) => console.log(err.message));
  }, [id]);

  const handleDelete = () => {
    if (!id) {
      console.error("Error: Note ID is undefined!");
      return;
    }
    axios
      .delete(`http://127.0.0.1:8000/notes/${id}/`) // Fixed URL syntax
      .then(() => {
        deleteNote(id);
        navigate("/");
      })
      .catch((err) => console.error("Delete error:", err.response?.data || err.message));
  };



  return (
    <Container className="mt-4">
      <motion.div
        className="note-container p-3 bg-white shadow-sm rounded border border-primary border-1"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-primary text-center text-uppercase fw-bold animate-title">{note.title}</h3>
        <Row className="justify-content-center text-muted mb-1 animate-text">
          <Col md={5}><p>Created: {FormatDate(note.created)}</p></Col>
          <Col md={5}><p>Last updated: {FormatDate(note.updated)}</p></Col>
        </Row>
        <motion.p
          className="fs-6 text-dark text-center p-2 animate-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <strong>Content:</strong> {note.body}
        </motion.p>
        
        <Row className="justify-content-center mb-3">
          <Col md={3} className="text-center">
            <Link to={`/edit-note/${id}`}> {/* Fixed template literal */}
              <Button variant="primary" size="md" className="me-2 animate-button">
                <FiEdit /> Edit
              </Button>
            </Link>
          </Col>
          <Col md={3} className="text-center">
            <Button variant="danger" size="md" className="animate-button" onClick={handleIsOpen}>
              <BiSolidTrashAlt /> Delete
            </Button>
          </Col>
        </Row>
      </motion.div> 

      <Modal show={isOpen} onHide={handleIsOpen} centered>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">Are you sure you want to delete this note?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleIsOpen}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} className="animate-button">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default NoteDetailPage;
















