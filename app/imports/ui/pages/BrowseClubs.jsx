import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';
import ClubFilter from '../components/ClubFilter';
import ClubCard from '../components/ClubCard';

const BrowseClubs = () => (
  <Container fluid className="mx-auto px-0 ">
    <Container fluid id="browseSection">
      <h1 className="text-center py-5">Find your club. Get connected.</h1>
      <ClubFilter />
    </Container>
    <Container className="mt-4 py-2 px-0">
      <a href="addclub" className="d-grid text-decoration-none text-white justify-content-center">
        <Button id="createClubBtn" className="border border-3 rounded-pill" variant="outline-dark" size="lg"><h4 className="pt-3"><PlusLg className="h1" />&nbsp;&nbsp;Create a Club!</h4></Button>
      </a>
      <h4 className="mt-4 ms-4">20 clubs found:</h4>
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
