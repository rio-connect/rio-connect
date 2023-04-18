import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import UserContactInfo from '../components/UserContactInfo';
import UserClubList from '../components/UserClubList';
import UserEditClub from '../components/UserEditClub';

// Create a schema to specify the structure of the data to appear in the form.
/* Renders the AddStuff page for adding a document. */
const ClubCardTestPage = () => (
  <Container>
    <Row className="profile-heading justify-content-center pt-4 pb-2">
      User Profile
    </Row>
    <Row>
      <UserContactInfo />
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
);
export default ClubCardTestPage;
