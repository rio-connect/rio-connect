import React from 'react';
/* import PropTypes from 'prop-types'; */
import { Row, Container, ListGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import UserClubCard from './UserClubCard';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const UserClubList = ({ clubs }) => (
  <Container className="py-3 gray-background">
    <Row className="justify-content-center">
      <ListGroup className="ps-3 pe-3">
        {clubs.map((club) => <UserClubCard key={club._id} club={club} />)}
      </ListGroup>
    </Row>
    <Row className="ps-3 pe-3 pt-3">
      <a href="/browseclubs" className="text-center gap-2 text-decoration-none text-white">
        <Button variant="primary" size="lg">Browse Clubs</Button>
      </a>
    </Row>
  </Container>
);

UserClubList.propTypes = {
  clubs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    ownerMail: PropTypes.string,
    _id: PropTypes.string,
  })).isRequired,
};

export default UserClubList;
