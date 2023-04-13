import React from 'react';
import { Col, Container, Image, Row, Card, Form, Button } from 'react-bootstrap';

// Create a schema to specify the structure of the data to appear in the form.
/* Renders the AddStuff page for adding a document. */
const AddClub = () => (
  <Container className="py-3">
    <p>reference image</p>
    <Image src="images/add-club-mockup.png" alt="mockup reference"/>
    <Container className="py-3">
      <Card id="add-club-page">
        <Card.Header className="d-flex justify-content-center"><h1>Create a Club</h1></Card.Header>
        <Row>
          <Col>
            <Image src="images/rio-connect-logo.png" className="img-thumbnail m-4 p-4" />
          </Col>
          <Col>
            <Row>
              <Form className="p-4">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label><h2>Club Name: </h2></Form.Label>
                  <Form.Control type="text" placeholder="Enter Club Name" />
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
                  <Form.Control type="text" placeholder="Enter club's lead contact" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label><h2>Contact Email: </h2></Form.Label>
                  <Form.Control type="text" placeholder="Enter contact's email" />
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
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <div className="d-grid gap-2 py-5">
            <Button variant="primary" size="lg"> Save </Button>
          </div>
        </Row>
      </Card>
    </Container>
  </Container>
);
export default AddClub;
