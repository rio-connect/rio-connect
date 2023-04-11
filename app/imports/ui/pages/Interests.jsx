import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
// eslint-disable-next-line no-unused-vars
import swal from 'sweetalert';
// eslint-disable-next-line no-unused-vars
import { Meteor } from 'meteor/meteor';
// import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Clubs } from '../../api/club/Club';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  type: String,
  description: String,
  owner: String,
  ownerMail: String,
  members: Array,
  'members.$': String,
  image: String,
  interests: Array,
  'interests.$': String,
});

// const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const Interests = () => {

  // On submit, insert the data.
  const submit = (data) => {
    const { type } = data;
    Clubs.collection.updateOne({}, { $set: { interests: type } });
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Interests</h2></Col>
          <AutoForm onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField name="type" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default Interests;
