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
const ClubCardTestPage = () => {
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');

  const { profiles, clubs, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    let subscription2 = [];
    if (isAdmin) {
      subscription2 = Meteor.subscribe(Clubs.adminPublicationName);
    } else {
      subscription2 = Meteor.subscribe(Clubs.userPublicationName);
    }
    const rdy = subscription.ready() && subscription2.ready();
    const profile = Profiles.collection.find({}).fetch();
    const club = Clubs.collection.find({}).fetch();
    return {
      profiles: profile[0],
      clubs: club,
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
        <UserClubList clubs={clubs} />
      </Row>
      {
        isAdmin && (
          <>
            <Row className="profile-heading justify-content-center pt-4 pb-2">
              Edit Club
            </Row>
            <Row>
              <UserEditClub clubs={clubs}/>
            </Row>
          </>
        )
      }
    </Container>
  ) : <LoadingSpinner />);
};

export default ClubCardTestPage;
