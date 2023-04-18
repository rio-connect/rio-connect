import React from 'react';
import { Container, Row } from 'react-bootstrap';
import EditClub from '../components/EditClub';

// Create a schema to specify the structure of the data to appear in the form.
/* Renders the AddStuff page for adding a document. */
const EditClubPage = () => (

  <Container>
    <Row>
      <EditClub />
    </Row>
  </Container>
);
export default EditClubPage;
