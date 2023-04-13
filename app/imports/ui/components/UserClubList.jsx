import React from 'react';
/* import PropTypes from 'prop-types'; */
import { Row, Container, ListGroup, Button } from 'react-bootstrap';
import UserClubCard from './UserClubCard';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const UserClubList = () => (
  <Container className="py-3 gray-background">
    <Row className="justify-content-center">
      <ListGroup className="ps-3 pe-3">
        <UserClubCard />
        <UserClubCard />
        <UserClubCard />
      </ListGroup>
    </Row>
    <Row className="ps-3 pe-3 pt-3">
      <a href="browseclubs" className="d-grid gap-2 text-decoration-none text-white">
        <Button variant="primary" size="md">Browse Clubs</Button>
      </a>
    </Row>
  </Container>

);

export default UserClubList;
