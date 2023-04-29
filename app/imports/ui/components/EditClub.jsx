import React from 'react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField, HiddenField, SelectField } from 'uniforms-bootstrap5';
import { useParams } from 'react-router';
import LoadingSpinner from './LoadingSpinner';
import { Clubs } from '../../api/club/Club';

const bridge = new SimpleSchema2Bridge(Clubs.schema);

const EditClub = () => {
// Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditStuff', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    let subscription = null;
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      subscription = Meteor.subscribe(Clubs.adminPublicationName);
    } else {
      subscription = Meteor.subscribe(Clubs.userPublicationName);
    }
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Clubs.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditStuff', doc, ready);
  // On successful submit, insert the data.
  const allTypes = ['Academic/Professional', 'Ethic/Cultural', 'Fraternity/Sorority', 'Honorary Society', 'Leisure/Recreational', 'Political', 'Religious/Spiritual', 'Service', 'Sports/Leisure', 'Student Affairs'];

  const submit = (data) => {
    const { name, type, description, owner, ownerMail, members, image } = data;
    Clubs.collection.update(_id, { $set: { name, type, description, owner, ownerMail, members, image } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Club updated successfully', 'success')));
  };
  const allInterests = ['Academic/Professional', 'Ethic/Cultural', 'Fraternity/Sorority', 'Honorary Society', 'Leisure/Recreational', 'Political', 'Religious/Spiritual', 'Service', 'Sports/Leisure', 'Student Affairs'];
  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Edit Club</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField id="edit-form-name" name="name" /></Col>
                  <Col><TextField id="edit-form-image" name="image" /></Col>
                </Row>
                <LongTextField id="edit-form-description" name="description" />
                <Row><SelectField id="edit-form-type" name="type" allowedValues={allTypes} /></Row>
                <SubmitField id="edit-form-submit" value="Submit" />
                <ErrorsField />
                <HiddenField name="members" />
                <HiddenField name="owner" />
                <HiddenField name="ownerMail" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditClub;
