import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import ClubFilter from '../components/ClubFilter';
import ClubCard from '../components/ClubCard';

/* Renders the AddStuff page for adding a document. */
const BrowseClubs = () => (
  <Container fluid className="mx-auto px-0 ">
    <Container fluid id="browseSection">
      <h1 className="text-center py-5">Find your club. Get connected</h1>
      <ClubFilter />
    </Container>
    <Container id="get-started" className="mt-4 py-5 px-0">
      <a href="*" className="d-grid text-decoration-none text-white">
        <Button className="py-4" variant="primary" size="lg">Create a Club!</Button>
      </a>
    </Container>
    <Container>
      <Row>
        <Col><ClubCard /></Col>
        <Col><ClubCard /></Col>
        <Col><ClubCard /></Col>
      </Row>
      <Row>
        <Col><ClubCard /></Col>
        <Col><ClubCard /></Col>
        <Col><ClubCard /></Col>
      </Row>
      <Row>
        <Col><ClubCard /></Col>
        <Col><ClubCard /></Col>
        <Col><ClubCard /></Col>
      </Row>
    </Container>
  </Container>
);

export default BrowseClubs;
