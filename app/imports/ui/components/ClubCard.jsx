import React from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/CardHeader';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ClubCard = () => (
  <Container className="py-3">
    <Card>
      <CardHeader className="d-flex justify-content-center"><h1>Club Name</h1></CardHeader>
      <Row>
        <Col>
          <Image src="images/generic-user.png" className="img-thumbnail m-4 p-4" />
        </Col>
        <Col className="d-flex align-items-center flex-column">
          <Row className="px-4 pt-4">
            <h2> Club Type</h2>
            <p>Club type</p>
          </Row>
          <Row className="px-4">
            <h2> Contact Person</h2>
            <p>contact person</p>
          </Row>
          <Row className="px-4">
            <h2> Contact email</h2>
            <p>club email</p>
          </Row>
        </Col>
      </Row>
      <Row className="px-4">
        <h2>Club Purpose</h2>
        <p>lorem Ipsum</p>
      </Row>
    </Card>
  </Container>
);

export default ClubCard;
