import React from 'react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField, HiddenField } from 'uniforms-bootstrap5';
import { useParams } from 'react-router';
import LoadingSpinner from './LoadingSpinner';
import { Clubs } from '../../api/club/Club';
import { Profiles } from '../../api/profile/Profile';

const bridge = new SimpleSchema2Bridge(Clubs.schema);

const EditClub = () => {
// Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditStuff', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc1, doc2, ready } = useTracker(() => {
  // Get access to Stuff documents.
    let subscription1 = null;
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      subscription1 = Meteor.subscribe(Clubs.adminPublicationName);
    } else {
      subscription1 = Meteor.subscribe(Clubs.userPublicationName);
    }
    const subscription2 = Meteor.subscribe(Profiles.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription1.ready() && subscription2.ready();
    // Get the document
    const document1 = Clubs.collection.findOne(_id);
    const document2 = Profiles.Collection.find();
    return {
      doc1: document1,
      doc2: document2,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditStuff', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { name, type, description, owner, ownerMail, members, image } = data;
    Clubs.collection.update(_id, { $set: { name, type, description, owner, ownerMail, members, image } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Club updated successfully', 'success')));
  };
  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Edit Contact</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc1}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="name" /></Col>
                  <Col><TextField name="image" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="owner" /></Col>
                  <Col><TextField name="ownerMail" /></Col>
                </Row>
                <LongTextField name="description" />
                <Row><TextField name="type" /></Row>
                <SubmitField value="Submit" />
                <ErrorsField />
                <HiddenField name="members" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditClub;
