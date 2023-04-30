import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Clubs } from '../../api/club/Club';
import LoadingSpinner from '../components/LoadingSpinner';
import EditClubInformation from '../components/EditClubInformation';
import EditClubRoster from '../components/EditClubRoster';

const EditClubPage = () => {
  // Get the club ID from the URL.
  const { _id } = useParams();

  const { club, ready } = useTracker(() => {
    // Subscribe to the ClubsCollection.
    let subscription = null;
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      subscription = Meteor.subscribe(Clubs.adminPublicationName);
    } else {
      subscription = Meteor.subscribe(Clubs.userPublicationName);
    }
    // Determine if the subscription is ready.
    const rdy = subscription.ready();
    // Get the club to be edited.
    const clubToBeEdited = Clubs.collection.findOne(_id);
    return {
      club: clubToBeEdited,
      ready: rdy,
    };
  }, [_id]);

  // Define the appearance of the page.
  // Render the Edit Club page only when the subscription is ready.
  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Row className="text-center">
            <h2>Edit Club</h2>
          </Row>
          <EditClubInformation club={club} />
          <Row className="text-center">
            <h2>Club Roster</h2>
          </Row>
          <Row className="justify-content-center">
            <EditClubRoster club={club} />
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};
export default EditClubPage;
