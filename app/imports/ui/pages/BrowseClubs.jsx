import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, SelectField, SubmitField } from 'uniforms-bootstrap5';
import { Container, Button, Row, Col, InputGroup, Form } from 'react-bootstrap';
import { PlusLg, Search } from 'react-bootstrap-icons';
import { Clubs } from '../../api/club/Club';
import ClubCard from '../components/ClubCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useStickyState } from '../utilities/StickyState';

const allInterests = ['Academic/Professional', 'Ethic/Cultural', 'Fraternity/Sorority', 'Honorary Society', 'Leisure/Recreational', 'Political', 'Religious/Spiritual', 'Service', 'Sports/Leisure', 'Student Affairs'];

const formSchema = new SimpleSchema({
  interests: { label: '', type: Array, optional: true },
  'interests.$': { type: String, allowedValues: allInterests },
});

const BrowseClubs = () => {
  const [interests, setInterests] = useStickyState('interests', allInterests);
  let selectedInterests = [];
  const { ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Clubs.publicPublicationName);
    return {
      ready: subscription.ready(),
    };
  }, []);

  const submit = (data) => {
    if (data.interests.length === 0) {
      setInterests(allInterests || allInterests);
      selectedInterests = [];
    } else {
      setInterests(data.interests || allInterests);
      selectedInterests = data.interests;
    }
  };

  const bridge = new SimpleSchema2Bridge(formSchema);
  const clubs = Clubs.collection.find({ type: { $in: interests } }).fetch();
  const clubsCount = Clubs.collection.find({ type: { $in: interests } }).count();
  const transform = (label) => ` ${label}`;
  return (ready ? (
    <Container fluid className="mx-auto px-0 ">
      <Container fluid id="browseSection">
        <h1 className="text-center py-5">Find your club. Get connected.</h1>
        <Container>
          <AutoForm className="mt-4 mx-5" schema={bridge} onSubmit={data => submit(data)} model={{ selectedInterests }}>
            <Row className="mx-0 mb-5  pb-5">
              <Col sm={10} md={8} lg={6} className="mx-auto">
                <InputGroup size="lg">
                  <Form.Control id="searchBar" type="text" className="rounded-left-1 border-0 fs-6" placeholder="Search clubs..." />
                  <Button id="searchBtn" variant="light" type="button" className="search border-0"><Search /></Button>
                </InputGroup>
              </Col>
            </Row>
            <Container id="filterContainer" className="py-3 gray-background">
              <h4>Filter</h4>
              <hr />
              <h5>Your interests:</h5>
              <Container id="selectInterests" className="px-0">
                <SelectField
                  className="selectField mx-auto"
                  name="interests"
                  showInlineError
                  help=""
                  multiple
                  checkboxes
                  inline
                  transform={transform}
                />
              </Container>
              <SubmitField className="text-center my-2" value="Apply" />
            </Container>
          </AutoForm>
        </Container>
      </Container>
      <Container className="mt-4 py-2 px-0">
        <a id="createClubLink" href="addclub" className="d-grid rounded-pill text-decoration-none mx-auto">
          <Button id="createClubBtn" className="border border-3 rounded-pill" variant="outline-dark" size="lg"><h4 className="pt-3"><PlusLg className="h1" />&nbsp;&nbsp;Create a Club!</h4></Button>
        </a>
        <h4 id="numClubs" className="mt-4 ms-0">{clubsCount} club(s) found:</h4>
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
