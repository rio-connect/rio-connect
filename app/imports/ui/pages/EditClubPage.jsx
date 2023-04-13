import React from 'react';
import EditClub from '../components/EditClub';
import { Container, Row } from 'react-bootstrap';
import UserContactInfo from '../components/UserContactInfo';
import UserClubList from '../components/UserClubList';
import UserEditClub from '../components/UserEditClub';
import ClubOwners from '../components/ClubOwners';
import ClubMembers from '../components/ClubMembers';

// Create a schema to specify the structure of the data to appear in the form.
/* Renders the AddStuff page for adding a document. */
const EditClubPage = () => (

  <Container>
    {/* The EditClub component should not have a title, and instead rely on the parent page to provide a title.
    <Row className="profile-heading justify-content-center pt-4 pb-2">
      Your Club
    </Row>
    */}
    <Row>
      <EditClub />
    </Row>
    <Row className="profile-heading justify-content-center pt-4 pb-2">
      Administrators(s)
    </Row>
    <Row>
      <ClubOwners />
    </Row>
    <Row className="profile-heading justify-content-center pt-4 pb-2">
      Members
    </Row>
    <Row>
      <ClubMembers />
    </Row>
  </Container>
);
export default EditClubPage;
