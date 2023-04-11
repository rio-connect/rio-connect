import React from 'react';
import { Container, Button, Row, Image } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (

  <Container className="pt-5 d-flex justify-content-center">
    <Row>
      <div>
        <Image className="py-5 mx-auto d-block rounded" id="centerImage" src="images/manoa-students.jpeg" alt="UH Manoa students." width="90%" />
      </div>
      <div>

        <h1 className="text-center pb-3">Welcome to Rio-Connect!</h1>
        <p>
          Rio-Connect is the ultimate app for college students looking to discover new clubs and organizations on their university campus!
        </p>
        <p>
          Are you tired of attending the same events and meetings week after week? Do you want to branch out and explore all that your university has to offer? Look no further than Rio-Connect. Our app is designed to connect you with new
          and
          exciting clubs that match your interests and passions.
        </p>
        <p>
          Whether you are a freshman looking to find your niche on campus, or a senior hoping to try something new before graduation, ClubConnect has something for everyone.
        </p>
        <p>
          So what are you waiting for? Download ClubConnect today and start discovering all the amazing clubs and organizations that your university has to offer!
        </p>
      </div>
      <a href="/signup" id="get-started">
        <div className="d-grid gap-2 py-5">
          <Button variant="outline-primary" size="lg"> Get Started </Button>
        </div>
      </a>
    </Row>
  </Container>
);

export default Landing;
