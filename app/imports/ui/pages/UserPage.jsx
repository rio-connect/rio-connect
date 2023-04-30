import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import UserContactInfo from '../components/UserContactInfo';
import UserClubList from '../components/UserClubList';
import { Profiles } from '../../api/profile/Profile';
import LoadingSpinner from '../components/LoadingSpinner';
import { Clubs } from '../../api/club/Club';

const UserPage = () => {
  // Determine if the current user is an Admin.
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');

  // Subscribe to the ClubsCollection and ProfilesCollection.
  const { profile, clubs, ready } = useTracker(() => {
    // Subscribe only to our own profile.
    const profileSubscription = Meteor.subscribe(Profiles.userPublicationName);
    // Subscribe to all clubs if we are an Admin. Otherwise, just the ones we are a member of.
    const clubSubscription = isAdmin
      ? Meteor.subscribe(Clubs.adminPublicationName)
      : Meteor.subscribe(Clubs.userPublicationName);
    const rdy = profileSubscription.ready() && clubSubscription.ready();

    // The only profile in the ProfilesCollection should be our own profile.
    const myProfile = Profiles.collection.findOne({});
    // Fetch all the clubs in the ClubsCollection that we have access to.
    const club = Clubs.collection.find({}).fetch();
    return {
      profile: myProfile,
      clubs: club,
      ready: rdy,
    };
  }, []);

  // Define the appearance of the page.
  return (ready ? (
    <Container id="user-page">
      <Row className="profile-heading justify-content-center pt-4 pb-2">
        User Profile
      </Row>
      <Row>
        <UserContactInfo profile={profile} />
      </Row>
      <Row className="profile-heading justify-content-center pt-4 pb-2">
        Clubs
      </Row>
      <Row className="pb-4">
        <UserClubList clubs={clubs} profile={profile} isAdmin={isAdmin} />
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default UserPage;
