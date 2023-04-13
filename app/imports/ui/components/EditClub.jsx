import React from 'react';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const EditClub = () => (
  <Container className="py-3">
    <Card id="edit-club" className="gray-background">
      <Card.Header className="d-flex justify-content-center py-3"><h1>Your Club</h1></Card.Header>
      <Row>
        <Col>
          <Image src="images/rio-connect-logo.png" className="img-thumbnail m-4 p-4" />
        </Col>
        <Col>
          <Row>
            <Form className="p-4">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label><h2>Club Name: </h2></Form.Label>
                <Form.Control type="text" placeholder="Your club name..." />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label><h2>Club Type: </h2></Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label><h2>Contact Person: </h2></Form.Label>
                <Form.Control type="text" placeholder="John Doe" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label><h2>Contact Email: </h2></Form.Label>
                <Form.Control type="text" placeholder="john@foo.com" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label><h2>Club Image: </h2></Form.Label>
                <Form.Control type="text" placeholder="Enter image source here" />
              </Form.Group>
            </Form>
          </Row>
        </Col>
      </Row>
      <Row className="px-4">
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label placeholder="Lorem ipsum"><h2>Club Purpose: </h2></Form.Label>
          <Form.Control as="textarea" rows={5} />
        </Form.Group>
        <div className="d-grid gap-2 py-5">
          <Button variant="primary" size="lg"> Save </Button>
        </div>
      </Row>
    </Card>
  </Container>
);

export default EditClub;
