import React from 'react';
/* import PropTypes from 'prop-types'; */
import { Row, Container, ListGroup, Button, Form } from 'react-bootstrap';
import UserCard from './UserCard';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ClubOwners = () => (
  <Container className="py-3 gray-background">
    <Container className="ps-3 pe-3">
      <Row className="pb-2 d-grid justify-content-lg-center">
        Club Owner(s):
      </Row>
      <Row>
        <ListGroup className="list-group-horizontal justify-content-center">
          <UserCard />
          <UserCard />
        </ListGroup>
      </Row>
      <Row className="pt-2 pb-2 justify-content-center">
        Add Owner
      </Row>
      <Container className="w-25">
        <Form.Select className="text-center">
          <option>User 1</option>
          <option>User 2</option>
          <option>User 3</option>
          <option>User 4</option>
        </Form.Select>
      </Container>
      <Container className="text-center pt-3 ">
        <Button size="lg" variant="primary">Add</Button>
      </Container>
    </Container>
  </Container>
);

export default ClubOwners;
