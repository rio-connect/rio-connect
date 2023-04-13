import React from 'react';
/* import PropTypes from 'prop-types'; */
import { Row, Container, ListGroup, Button } from 'react-bootstrap';
import UserClubCard from './UserClubCard';
import UserCard from './UserCard';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ClubAdmins = () => (
  <Container className="py-3 gray-background">
    <Row className="justify-content-center">
      <ListGroup className="ps-3 pe-3 list-group-horizontal">
        <UserCard />
        <UserCard />
        <UserCard />
      </ListGroup>
    </Row>
    <Row className="ps-3 pe-3 pt-3">
      <Button>Browse Clubs</Button>
    </Row>
  </Container>

);

export default ClubAdmins;
