import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ClubCard from '../components/ClubCard';

// Create a schema to specify the structure of the data to appear in the form.
/* Renders the AddStuff page for adding a document. */
const ClubCardTestPage = () => (
  <Container>
    <Row>
      <Col>
        <ClubCard />
      </Col>
      <Col>
        <ClubCard />
      </Col>
    </Row>
    <Row>
      <Col>
        <ClubCard />
      </Col>
      <Col>
        <ClubCard />
      </Col>
    </Row>
  </Container>
);
export default ClubCardTestPage;
