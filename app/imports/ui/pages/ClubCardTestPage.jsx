import React from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/CardHeader';

// Create a schema to specify the structure of the data to appear in the form.
/* Renders the AddStuff page for adding a document. */
const AddClub = () => (
  <Container className="py-3">
    <Card>
      <CardHeader>Club Name</CardHeader>
      <Row>
        <Col>
          <Image>Club image</Image>
        </Col>
        <Col>
          <div>
            <h2> Club Type</h2>
            <p>Club type</p>
          </div>
          <div>
            <h2> Contact Person</h2>
            <p>contact person</p>
          </div>
          <div>
            <h2> Contact email</h2>
            <p>club email</p>
          </div>
        </Col>
      </Row>
      <Row>
        <h2>Club Purpose</h2>
        <p>lorem Ipsum</p>
      </Row>
    </Card>
  </Container>
);
export default AddClub;
