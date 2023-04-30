import React from 'react';
/* import PropTypes from 'prop-types'; */
import { Row, Container, ListGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import UserClubCard from './UserClubCard';
import { Clubs } from '../../api/club/Club';

const UserClubList = ({ clubs, profile, isAdmin }) => {
  // Callback function for leaving a club.
  const handleLeaveClub = (clubToBeLeft) => {
    // Verify that the user wants to leave.
    swal({
      title: `Really leave club ${clubToBeLeft.name}?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willLeave) => {
        if (willLeave) {
          // Check if the user is the owner of the club.
          if (clubToBeLeft.ownerMail === profile.email) {
            swal({
              title: 'Error',
              text: 'You cannot leave the club because you are the owner. Please transfer ownership to another user before leaving the club.',
              icon: 'error',
              buttons: {
                cancel: 'Close',
              },
              dangerMode: true,
            });
          } else {
            // Write the change to the ClubsCollection.
            Clubs.collection.update(
              { _id: clubToBeLeft._id },
              { $pull: { members: profile.email } },
              (error) => {
                if (error) {
                  swal('Error', error.message, 'error');
                } else {
                  swal('Success', 'You have left the club.', 'success');
                }
              },
            );
          }
        }
      });
  };

  // Define the appearance of the component.
  return (
    <Container id="user-club-list" className="py-3 gray-background">
      <Row className="justify-content-center">
        <ListGroup className="ps-3 pe-3 user-club-list-scrollable">
          {clubs.map((club) => <UserClubCard key={club._id} club={club} onLeaveClub={handleLeaveClub} isAdmin={isAdmin} canEdit={isAdmin || club.ownerMail === profile.email} />)}
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
  isAdmin: PropTypes.bool.isRequired,
};

export default UserClubList;
