import React from 'react';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Card, Col, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField, HiddenField } from 'uniforms-bootstrap5';
import PropTypes from 'prop-types';
import { Clubs } from '../../api/club/Club';

// Use the Clubs schema for the form's fields.
const bridge = new SimpleSchema2Bridge(Clubs.schema);

const EditClubInformation = ({ club }) => {
  // Callback function to submit a change to a club's information.
  const submit = (data) => {
    const { name, type, description, owner, ownerMail, members, image } = data;
    Clubs.collection.update(
      club._id,
      { $set: { name, type, description, owner, ownerMail, members, image } },
      (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Club updated successfully', 'success')),
    );
  };

  // Define the appearance of the component.
  return (
    <AutoForm schema={bridge} onSubmit={data => submit(data)} model={club}>
      <Card>
        <Card.Body>
          <Row>
            <Col>
              <TextField id="edit-form-name" name="name" />
            </Col>
            <Col>
              <TextField id="edit-form-image" name="image" />
            </Col>
          </Row>
          <LongTextField id="edit-form-description" name="description" />
          <Row>
            <TextField id="edit-form-type" name="type" />
          </Row>
          <SubmitField id="edit-form-submit" value="Submit" />
          <ErrorsField />
          <HiddenField name="members" />
          <HiddenField name="owner" />
          <HiddenField name="ownerMail" />
        </Card.Body>
      </Card>
    </AutoForm>
  );
};

EditClubInformation.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
    ownerMail: PropTypes.string,
    type: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default EditClubInformation;
