import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profile';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  email: String,
  phoneNo: {
    type: String,
    required: false,
    label: 'Phone Number (optional)',
  },
});

// Build a bridge from that schema.
const bridge = new SimpleSchema2Bridge(formSchema);

const UserContactInfo = ({ profile }) => {
  // Callback function that updates the ProfilesCollection with the user's data.
  const submit = (data) => {
    const { name, email, phoneNo } = data;
    Profiles.collection.update(
      profile._id,
      { $set: { name, email, phoneNo } },
      (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Club updated successfully', 'success')),
    );
  };

  // Define the appearance of the component.
  return (
    <Container id="user-contact-info" className="py-3 gray-background">
      <Row className="justify-content-center">
        <Col xs={3} className="d-flex align-items-center">
          <img src="images/generic-user.png" width="100%" alt="Your user profile" />
        </Col>
        <Col xs={4}>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={profile}>
            <TextField name="name" id="user-name" />
            <TextField name="email" id="user-email" disabled />
            <TextField name="phoneNo" id="user-phone" />
            <SubmitField value="Update Profile" />
            <ErrorsField />
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

UserContactInfo.propTypes = {
  profile: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    phoneNo: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default UserContactInfo;
