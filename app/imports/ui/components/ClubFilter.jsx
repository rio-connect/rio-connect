import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, SelectField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';

const InterestsValues = {
  interests: ['Academic/Professional', 'Ethic/Cultural', 'Fraternity/Sorority', 'Honorary Society'],
};

// const InterestsValues = {
//   interests: ['Academic/Professional', 'Ethic/Cultural', 'Fraternity/Sorority', 'Honorary Society', 'Leisure/Recreational', 'Political', 'Religious/Spiritual', 'Service', 'Sports/Leisure', 'Student Affairs'],
// };

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
  search: {
    type: String,
    label: '',
  },
  interests: { label: '', type: Array, optional: true },
  'interests.$': { type: String, allowedValues: InterestsValues.interests },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const ClubFilter = () => {
  const transform = (label) => ` ${label}`;

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { firstName, lastName, email, phoneNumber } = data;
    const owner = Meteor.user().username;
    /* Stuffs.collection.insert(
      { firstName, lastName, email, phoneNumber, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    ); */
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;

  return (
    <Container>
      <AutoForm className="mt-4" ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
        <TextField name="search" className="mx-5 pb-5" placeholder="Search club..." />
        <Container className="py-3 gray-background">
          <h3>Filter</h3>
          <hr />
          <h5>Your interests:</h5>

          <Row className="justify-content-center">
            <Col xs={3}>
              <SelectField
                name="interests"
                showInlineError
                help=""
                multiple
                checkboxes
                inline
                transform={transform}
              />
            </Col>
            <Col xs={3}>
              <SelectField
                name="interests"
                showInlineError
                help=""
                multiple
                checkboxes
                inline
                transform={transform}
              />
            </Col>
            <Col xs={3}>
              <SelectField
                name="interests"
                showInlineError
                help=""
                multiple
                checkboxes
                inline
                transform={transform}
              />
            </Col>
          </Row>
          <SubmitField className="d-grid my-4" value="Apply" />
          <ErrorsField />

        </Container>
      </AutoForm>
    </Container>
  );
};

export default ClubFilter;
