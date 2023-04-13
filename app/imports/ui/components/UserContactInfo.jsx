import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/Stuff';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: {
    type: String,
    label: 'First Name',
  },
  lastName: {
    type: String,
    label: 'Last Name',
  },
  email: String,
  phoneNumber: {
    type: String,
    required: false,
    label: 'Phone Number (optional)',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const UserContactInfo = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { firstName, lastName, email, phoneNumber } = data;
    const owner = Meteor.user().username;
    Stuffs.collection.insert(
      { firstName, lastName, email, phoneNumber, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
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
        <Col xs={3} className="d-flex align-items-center">
          <img src="images/generic-user.png" width="100%" alt="Your user profile" />
        </Col>
        <Col xs={4}>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <TextField name="firstName" />
            <TextField name="lastName" />
            <TextField name="email" />
            <TextField name="phoneNumber" />
            <SubmitField value="Update Profile" />
            <ErrorsField />
          </AutoForm>
        </Col>
      </Row>
    </Container>

  );
};

export default UserContactInfo;
