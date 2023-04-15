import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Clubs } from '../../api/club/Club';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Clubs.schema);

/* Renders the EditStuff page for editing a single document. */
const EditClub2 = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditStuff', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Clubs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Clubs.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditClub', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { name, type, description, ownerMail, image } = data;
    Clubs.collection.update(_id, { $set: { name, type, description, ownerMail, image } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };

  return ready ? (
    <Container className="py-3">
      <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
        <Card id="edit-club" className="gray-background">
          <Card.Header className="d-flex justify-content-center py-3"><h1>Your Club</h1></Card.Header>
          <Row>
            <Col>
              <Image src="images/rio-connect-logo.png" className="img-thumbnail m-4 p-4" />
            </Col>
            <Col>
              <Row>
                <Form className="p-4">
                  <TextField name="name" />
                  <TextField
                    name="type"
                  />
                  <TextField name="ownerMail" />
                  <TextField name="image" />
                </Form>
              </Row>
            </Col>
          </Row>
          <Row className="px-4">
            <LongTextField name="description" />
            <Row className="justify-content-center">
              <SubmitField value="Submit" />
              <HiddenField name="owner" />
            </Row>
          </Row>
        </Card>
      </AutoForm>
      <ErrorsField />
    </Container>
  ) : <LoadingSpinner />;
};

export default EditClub2;
