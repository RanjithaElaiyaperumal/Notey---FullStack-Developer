import React from "react";
import Filter from "../components/Filter";
import NoteCardContainer from "../components/NoteCardContainer";
import { Container, Row, Col, Alert } from "react-bootstrap";
import "./HomePage.css"

const HomePage = ({ notes, loading, handleFilterText }) => {
  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col md={8}>
          {notes.length < 1 ? (
            <Alert variant="warning" className="text-center">
              There is no notes found with the search phrase above
            </Alert>
          ) : (
            <Filter handleFilterText={handleFilterText} />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <NoteCardContainer notes={notes} loading={loading} />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
