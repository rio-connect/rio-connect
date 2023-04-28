import React from 'react';
/* import PropTypes from 'prop-types'; */
import { Row, Container, ListGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import UserClubCard from './UserClubCard';
import { Clubs } from '../../api/club/Club';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const UserClubList = ({ clubs, profile }) => {

  const handleLeaveClub = (clubToBeLeft) => {
    const userEmail = profile.email;

    swal({
      title: `Really leave club ${clubToBeLeft.name}?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willLeave) => {
        if (willLeave) {
          Clubs.collection.update(
            { _id: clubToBeLeft._id },
            { $pull: { members: userEmail } },
            (error) => {
              if (error) {
                swal('Error', error.message, 'error');
              } else {
                swal('Success', 'You have left the club.', 'success');
              }
            },
          );
        }
      });
  };

  return (
    <Container id="user-club-list" className="py-3 gray-background">
      <Row className="justify-content-center">
        <ListGroup className="ps-3 pe-3">
          {clubs.map((club) => <UserClubCard key={club._id} club={club} onLeaveClub={handleLeaveClub} />)}
        </ListGroup>
      </Row>
      <Row className="ps-3 pe-3 pt-3">
        <a href="/browseclubs" className="text-center gap-2 text-decoration-none text-white">
          <Button variant="primary" size="lg">Browse Clubs</Button>
        </a>
      </Row>
    </Container>
  );
};

UserClubList.propTypes = {
  clubs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    ownerMail: PropTypes.string,
    _id: PropTypes.string,
  })).isRequired,
  profile: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
};

export default UserClubList;
