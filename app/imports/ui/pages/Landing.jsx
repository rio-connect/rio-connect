import React from 'react';
import { Container } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (

  <Container className="pt-5 d-flex justify-content-center">
    <img className="py-5" id="centerImage" src="images/manoa-students.jpeg" alt="UH Manoa students." width="90%" />
  </Container>
);

export default Landing;
