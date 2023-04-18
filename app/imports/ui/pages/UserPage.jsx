import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import UserContactInfo from '../components/UserContactInfo';
import UserClubList from '../components/UserClubList';
import UserEditClub from '../components/UserEditClub';
import { Profiles } from '../../api/profile/Profile';
import LoadingSpinner from '../components/LoadingSpinner';
import { Clubs } from '../../api/club/Club';

// Create a schema to specify the structure of the data to appear in the form.
/* Renders the AddStuff page for adding a document. */
const UserPage = () => {
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');

  const { profiles, clubs, ready, editableClubs } = useTracker(() => {
    const profileSubscription = Meteor.subscribe(Profiles.userPublicationName);
    const clubSubscription = isAdmin
      ? Meteor.subscribe(Clubs.adminPublicationName)
      : Meteor.subscribe(Clubs.userPublicationName);

    const rdy = profileSubscription.ready() && clubSubscription.ready();

    const profile = Profiles.collection.find({}).fetch();
    const club = Clubs.collection.find({}).fetch();
    const editableClub = isAdmin
      ? Clubs.collection.find({}).fetch()
      : Clubs.collection.find({ ownerMail: profile[0]?.email }).fetch();

    return {
      profiles: profile[0],
      clubs: club,
      editableClubs: editableClub,
      ready: rdy,
    };
  }, []);

  const canEdit = isAdmin || (editableClubs && editableClubs.length > 0);

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
        <UserClubList clubs={clubs} />
      </Row>
      {
        canEdit && (
          <>
            <Row className="profile-heading justify-content-center pt-4 pb-2">
              Edit Club
            </Row>
            <Row>
              <UserEditClub clubs={editableClubs} />
            </Row>
          </>
        )
      }
    </Container>
  ) : <LoadingSpinner />);
};

export default UserPage;
