import React from 'react';
/* import PropTypes from 'prop-types'; */
import { Row, Container, ListGroup, Button } from 'react-bootstrap';
import UserCard from './UserCard';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ClubMembers = () => (
  <Container className="py-3 gray-background">
    <Container className="ps-3 pe-3">
      <Row className="pb-2">
        Club Members
      </Row>
      <Row>
        <ListGroup className="list-group-horizontal">
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </ListGroup>
      </Row>
      <Row className="pt-2 pb-2">
        Add Member
      </Row>
      <Row>
        <input />
      </Row>
      <Container className="text-center pt-3">
        <Button size="lg">Add</Button>
      </Container>
    </Container>
  </Container>
);

export default ClubMembers;
