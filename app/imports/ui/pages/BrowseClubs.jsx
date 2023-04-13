import React from 'react';
import { Container, Image, Button } from 'react-bootstrap';
import ClubFilter from '../components/ClubFilter';

/* Renders the AddStuff page for adding a document. */
const BrowseClubs = () => (
  <Container className="py-3">
    <Image className="pb-5 rounded mx-auto d-block" id="centerImage" src="images/manoa-students-dark.jpeg" alt="UH Manoa students." width="100%" />
    <h1>Find your club. Get connected</h1>
    <ClubFilter />
    <Container id="get-started" className="mt-4 py-5 px-0">
      <a href="*" className="d-grid gap-2 text-decoration-none text-white">
        <Button variant="primary" size="lg">Create a Club</Button>
      </a>
    </Container>
  </Container>
);

export default BrowseClubs;
