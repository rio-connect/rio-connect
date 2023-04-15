import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { PlusLg } from 'react-bootstrap-icons';
import ClubFilter from '../components/ClubFilter';
import ClubCard from '../components/ClubCard';
import { Clubs } from '../../api/club/Club';
import LoadingSpinner from '../components/LoadingSpinner';

const BrowseClubs = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, clubs } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Contacts documents.
    const subscription = Meteor.subscribe(Clubs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Contacts documents
    const clubItems = Clubs.collection.find({}).fetch();
    return {
      clubs: clubItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container fluid className="mx-auto px-0 ">
      <Container fluid id="browseSection">
        <h1 className="text-center py-5">Find your club. Get connected.</h1>
        <ClubFilter />
      </Container>
      <Container className="mt-4 py-2 px-0">
        <a href="addclub" className="d-grid text-decoration-none text-white justify-content-center">
          <Button id="createClubBtn" className="border border-3 rounded-pill" variant="outline-dark" size="lg"><h4 className="pt-3"><PlusLg className="h1" />&nbsp;&nbsp;Create a Club!</h4></Button>
        </a>
        <h4 id="numClubs" className="mt-4 ms-0">{Clubs.collection.find().count()} clubs found:</h4>
      </Container>
      <Container id="browseResultsOuter" className="mx-auto px-0 ">
        <Row className="justify-content-left">
          {clubs.map((club) => (
            <Col className="pb-3 browseClubCards" xs={12} key={club._id}>
              <ClubCard
                club={club}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  ) : <LoadingSpinner />);
};

export default BrowseClubs;
