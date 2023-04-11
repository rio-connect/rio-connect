import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

// Create a schema to specify the structure of the data to appear in the form.
/* Renders the AddStuff page for adding a document. */
const AddClub = () => (
  <Container className="py-3">
    <Row className="justify-content-center">
      <Col className="text-center"><h2>Create a New Club</h2></Col>
      {/*
            <Card>
            <Card.Body>
            <TextField name="name" />
            <NumField name="quantity" />
            <SelectField name="condition" />
            <SubmitField value="Submit" />
            <ErrorsField />
            </Card.Body>
            </Card>
            */}
      <Image src="images/add-club-mockup.png" />
    </Row>
  </Container>
);
export default AddClub;
