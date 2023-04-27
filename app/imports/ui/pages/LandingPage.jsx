import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

/* A simple static component to render some text for the landing page. */
const LandingPage = () => {

  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Container id="landing-page" fluid className="px-0">
      <Container fluid className="white-color-block">
        <Container className="pt-5 px-5">
          <h1 className="text-center pb-5">Welcome to Rio-Connect!</h1>
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
        </Container>
        <Container fluid id="get-started" className="text-center mt-4 py-5 px-0">
          <a href="/signup" className=" gap-2 text-decoration-none text-white">
            <Button variant="primary" size="lg">Get Started</Button>
          </a>
        </Container>
      </Container>

      <Container fluid className="image-color-block">
        <Container className="pt-5 px-5">
          <h1 className="text-center pb-5">Browse clubs and get connected!</h1>
          <p>
            Search from hundreds of Registered Independent Organizations (RIOs) that are recognized by the University of Hawaiʻi Board of Regents, as well as unregistered clubs created by the University of Hawaiʻi  community members.
          </p>
          <br />
          <p>
            Add filters to your search by selecting your interest areas to narrow down your search results and find a club that share your passion!
          </p>
          <br />
          <p>
            Click the button below to start browsing now!
          </p>
          <Container id="get-started" className="text-center mt-4 py-5 px-0">
            <a href="browseclubs" className="gap-2 text-decoration-none text-white">
              <Button variant="primary" size="lg">Browse Clubs</Button>
            </a>
          </Container>
        </Container>
      </Container>

      <Container fluid className="gray-color-block">
        <Container className="pt-5 px-5">
          <h1 className="text-center pb-5">Start your own club!</h1>
          <p>
            Can&apos;t find a club that you&apos;re looking for? Why not create your own club? RIO Connect makes it easy for you to start a club and find members that meet your interest and share a passion.
          </p>
          <br />
          <p>
            By default, clubs created on RIO Connect are not recognized by the University of Hawaiʻi Board of Regents, however, club owners can&nbsp;
            <a className="text-black" href="https://manoa.hawaii.edu/studentlife/involvement/registered-independent-organizations/application-and-forms/">apply for RIO
            </a>&nbsp;
            once you find enough members through RIO Connect and meet requirements.&nbsp;
            <a className="text-black" href="https://manoa.hawaii.edu/studentlife/involvement/registered-independent-organizations/forming-an-rio/">Learn more
            </a>.
          </p>
          <br />
          {currentUser ? (
            [
              <p>Click the button below to create a club!</p>,
              <Container id="get-started" className="text-center mt-4 py-5 px-0">
                <a href="/addclub" className="gap-2 text-decoration-none text-white">,
                  <Button variant="primary" size="lg">Create a Club</Button>
                </a>
              </Container>,
            ]
          ) : [
            <p>Log in or register to create a club!</p>,
            <Container id="get-started" className="text-center mt-4 py-5 px-0">
              <a href="/SignUpPage" className="gap-2 text-decoration-none text-white">
                <Button variant="primary" size="lg">Sign up today!</Button>
              </a>
            </Container>,
          ]}

        </Container>
      </Container>

    </Container>
  );
};

export default LandingPage;
