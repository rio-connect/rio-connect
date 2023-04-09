import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';

// Create a schema to specify the structure of the data to appear in the form.
/* Renders the AddStuff page for adding a document. */
const AddClub = () => (
  <Container className="py-3">
    <Row className="justify-content-center">
      <Col xs={5}>
        <Col className="text-center"><h2>Create a New Club</h2></Col>
        <Card>
          <Card.Body>
            <TextField name="name" />
            <NumField name="quantity" decimal={null} />
            <SelectField name="condition" />
            <SubmitField value="Submit" />
            <ErrorsField />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);
export default AddClub;
