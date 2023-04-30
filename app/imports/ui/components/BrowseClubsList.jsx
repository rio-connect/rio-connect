import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import ClubCard from './ClubCard';
import { Clubs } from '../../api/club/Club';
import LoadingSpinner from './LoadingSpinner';

const BrowseClubsList = ({ interests, name }) => {
  const { ready, currentUser, clubs } = useTracker(() => {
    const subscription = Meteor.subscribe(Clubs.publicPublicationName);
    const fetchedClubs = Clubs.collection.find({ type: { $in: interests }, name: { $regex: name, $options: 'i' } }).fetch();
    return {
      ready: subscription.ready(),
      currentUser: Meteor.user(),
      clubs: fetchedClubs,
    };
  }, [interests, name]);
  const [updateClubs, setUpdateClubs] = useState(false);
  const clubsCount = clubs.length;
  const handleLeaveClub = (clubToBeLeft) => {
    swal({
      title: `Really leave club ${clubToBeLeft.name}?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willLeave) => {
        if (willLeave) {
          if (clubToBeLeft.ownerMail === currentUser.username) {
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
            Clubs.collection.update(
              { _id: clubToBeLeft._id },
              { $pull: { members: currentUser.username } },
              (error) => {
                if (error) {
                  swal('Error', error.message, 'error');
                } else {
                  swal('Success', 'You have left the club.', 'success');
                  setUpdateClubs(!updateClubs);
                }
              },
            );
          }
        }
      });
  };
  const handleJoinClub = (clubToBeJoined) => {
    Clubs.collection.update(
      { _id: clubToBeJoined._id },
      { $push: { members: currentUser.username } },
      (error) => {
        if (error) {
          console.log('Error', error.message, 'error');
        } else {
          console.log(`You have joined the club ${clubToBeJoined.name}`);
          setUpdateClubs(!updateClubs);
        }
      },
    );
  };
  return (ready ? (
    <Container id="browseResultsTop" fluid className="mx-auto p-0 ">
      <Container className="pt-4 py-2 px-0">
        {currentUser ? ([
          <a id="createClubLink" href="/addclub" className="d-grid rounded-pill text-decoration-none mt-2 mx-auto">
            <Button id="createClubBtn" className="border border-3 rounded-pill" variant="outline-dark" size="lg"><h4 className="pt-3"><PlusLg className="h1" />&nbsp;&nbsp;Create a Club!</h4></Button>
          </a>,
        ]
        ) : ''}
        <h4 id="numClubs" className="mt-3 ms-0">{clubsCount} club(s) found:</h4>
      </Container>
      <Container id="browseResultsOuter" className="mx-auto px-0 ">
        <Row className="justify-content-left">
          {clubs.map((club) => (
            <Col className="pb-3 browseClubCards" xs={12} key={club._id}>
              <ClubCard
                club={club}
                onLeaveClub={handleLeaveClub}
                onJoinClub={handleJoinClub}
                currentUser={currentUser?.username}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  ) : <LoadingSpinner />);
};

BrowseClubsList.propTypes = {
  interests: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
};

export default BrowseClubsList;
