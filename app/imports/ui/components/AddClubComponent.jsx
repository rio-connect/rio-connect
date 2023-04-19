import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Clubs } from '../../api/club/Club';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */

const formSchema = new SimpleSchema({
  name: String,
  type: String,
  description: String,
  owner: String,
  ownerMail: String,
  members: Array,
  'members.$': String,
  image: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const AddClubComponent = () => {
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, type, description, ownerMail, image, members } = data;
    const owner = Meteor.user().username;
    Clubs.collection.insert(
      { name, type, description, owner, ownerMail, image, members },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Club added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };
  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3 gray-background">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center"><h2>Create a Club</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <TextField name="name" />
                  </Col>
                  <Col>
                    <TextField
                      name="type"
                    />
                  </Col>
                  <Row>
                    <Col><TextField name="owner" /></Col>
                    <Col><TextField name="ownerMail" /></Col>
                  </Row>
                  <TextField name="image" />
                </Row>
                <LongTextField name="description" />
                <HiddenField name="members" />
                <ErrorsField />
                <Row className="text-center">
                  <SubmitField value="Submit" />
                </Row>
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddClubComponent;
