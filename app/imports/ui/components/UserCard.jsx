import React from 'react';
import { Card, Container, Image } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const UserCard = () => (
  <Card>
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <Image src="images/generic-user.png" width="100px" className="pt-3" />
      <p />
      <span className="user-name-heading">Firstname Lastname</span>
      <p />
      <a href="#" className="remove-link text-center">Remove member</a>
    </Container>
  </Card>
);

export default UserCard;
