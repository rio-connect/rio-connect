import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, SelectField, SubmitField } from 'uniforms-bootstrap5';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';
import swal from 'sweetalert';
import { Clubs } from '../../api/club/Club';
import ClubCard from '../components/ClubCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useStickyState } from '../utilities/StickyState';

const allInterests = ['Academic/Professional', 'Ethic/Cultural', 'Fraternity/Sorority', 'Honorary Society', 'Leisure/Recreational', 'Political', 'Religious/Spiritual', 'Service', 'Sports/Leisure', 'Student Affairs'];

const formSchema = new SimpleSchema({
  interests: { label: '', type: Array, optional: true },
  'interests.$': { type: String, allowedValues: allInterests },
});

const BrowseClubsPage = () => {
  const [interests, setInterests] = useStickyState('interests', allInterests);
  let selectedInterests = [];
  const { ready, currentUser, clubs } = useTracker(() => {
    const subscription = Meteor.subscribe(Clubs.publicPublicationName);
    const fetchedClubs = Clubs.collection.find({ type: { $in: interests } }).fetch();
    return {
      ready: subscription.ready(),
      currentUser: Meteor.user(),
      clubs: fetchedClubs,
    };
  }, []);

  const [updateClubs, setUpdateClubs] = useState(false);

  const submit = (data) => {
    if (data.interests.length === 0) {
      setInterests(allInterests || allInterests);
      selectedInterests = [];
    } else {
      setInterests(data.interests || allInterests);
      selectedInterests = data.interests;
    }
  };

  const handleLeaveClub = (clubToBeLeft) => {
    swal({
      title: `Really leave club ${clubToBeLeft.name}?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willLeave) => {
        if (willLeave) {
          Clubs.collection.update(
            { _id: clubToBeLeft._id },
            { $pull: { members: currentUser.username } },
            (error) => {
              if (error) {
                swal('Error', error.message, 'error');
              } else {
                swal('Success', 'You have left the club.', 'success');
                setUpdateClubs(!updateClubs);
              }
            },
          );
        }
      });
  };

  const handleJoinClub = (clubToBeJoined) => {
    Clubs.collection.update(
      { _id: clubToBeJoined._id },
      { $push: { members: currentUser.username } },
      (error) => {
        if (error) {
          console.log('Error', error.message, 'error');
        } else {
          console.log(`You have joined the club ${clubToBeJoined.name}`);
          setUpdateClubs(!updateClubs);
        }
      },
    );
  };

  const bridge = new SimpleSchema2Bridge(formSchema);
  const clubsCount = Clubs.collection.find({ type: { $in: interests } }).count();
  const transform = (label) => ` ${label}`;
  return (ready ? (
    <Container id="browse-clubs-page" fluid className="mx-auto px-0 ">
      <Container fluid id="browseSection">
        <h1 className="text-center py-5">Find your club. Get connected.</h1>
        <Container>
          <AutoForm className="mt-4 mx-5" schema={bridge} onSubmit={data => submit(data)} model={{ selectedInterests }}>
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
              <SubmitField id="selectInterestsApply" className="text-center my-2" value="Apply" />
            </Container>
          </AutoForm>
        </Container>
      </Container>
      <Container className="mt-4 py-2 px-0">
        {currentUser ? (
          [
            <a id="createClubLink" href="/addclub" className="d-grid rounded-pill text-decoration-none mx-auto">
              <Button id="createClubBtn" className="border border-3 rounded-pill" variant="outline-dark" size="lg"><h4 className="pt-3"><PlusLg className="h1" />&nbsp;&nbsp;Create a Club!</h4></Button>
            </a>,
          ]
        ) : ''}
        <h4 id="numClubs" className="mt-4 ms-0">{clubsCount} club(s) found:</h4>
      </Container>
      <Container id="browseResultsOuter" className="mx-auto px-0 ">
        <Row className="justify-content-left">
          {clubs.map((club) => (
            <Col className="pb-3 browseClubCards" xs={12} key={club._id}>
              <ClubCard
                club={club}
                onLeaveClub={handleLeaveClub}
                onJoinClub={handleJoinClub}
                currentUser={currentUser?.username}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  ) : <LoadingSpinner />);
};

export default BrowseClubsPage;
