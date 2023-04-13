import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Textarea } from 'react-bootstrap-icons';
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

const EditClub2 = () => {
  const submit = (data, formRef) => {
    const { name, type, description, owner, ownerMail, image } = data;
    const members = Meteor.user().username;
    Clubs.collection.insert(
      { name, type, description, owner, ownerMail, members, image },
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

  const fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Stuff</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="name" />
                <SelectField name="type" />
                <TextField name="description" />
                <TextField name="owner" />
                <TextField name="ownerMail" />
                <TextField name="image" />
                <Textarea name="description" />
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

export default EditClub2;
