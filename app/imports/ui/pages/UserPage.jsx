import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import UserContactInfo from '../components/UserContactInfo';
import UserClubList from '../components/UserClubList';
import UserEditClub from '../components/UserEditClub';
import { Profiles } from '../../api/profile/Profile';
import LoadingSpinner from '../components/LoadingSpinner';

// Create a schema to specify the structure of the data to appear in the form.
/* Renders the AddStuff page for adding a document. */
const ClubCardTestPage = () => {
  const { profiles, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const rdy = subscription.ready();
    const profile = Profiles.collection.find({}).fetch();
    return {
      profiles: profile[0],
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container>
      <Row className="profile-heading justify-content-center pt-4 pb-2">
        User Profile
      </Row>
      <Row>
        <UserContactInfo profile={profiles} />
      </Row>
      <Row className="profile-heading justify-content-center pt-4 pb-2">
        Clubs
      </Row>
      <Row>
        <UserClubList />
      </Row>
      <Row className="profile-heading justify-content-center pt-4 pb-2">
        Edit Club
      </Row>
      <Row>
        <UserEditClub />
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ClubCardTestPage;
