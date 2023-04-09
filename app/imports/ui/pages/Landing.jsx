import React from 'react';
import { Container, Button, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (

  <Container className="pt-5 d-flex justify-content-center">
    <div>
      <img className="py-5" id="centerImage" src="images/manoa-students.jpeg" alt="UH Manoa students." width="90%" />
    </div>
    <div>
      <p>
        Welcome to ClubConnect, the ultimate app for college students looking to discover new clubs and organizations on their university campus!

        Are you tired of attending the same events and meetings week after week? Do you want to branch out and explore all that your university has to offer? Look no further than ClubConnect. Our app is designed to connect you with new and
        exciting clubs that match your interests and passions.

        Whether you are a freshman looking to find your niche on campus, or a senior hoping to try something new before graduation, ClubConnect has something for everyone.

        So what are you waiting for? Download ClubConnect today and start discovering all the amazing clubs and organizations that your university has to offer!
      </p>
    </div>
    <div>
      <Button variant="outline-primary" size="lg">Get Started</Button>
    </div>
  </Container>
);

export default Landing;
