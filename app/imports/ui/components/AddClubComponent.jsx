import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Clubs } from '../../api/club/Club';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const allInterests = ['Academic/Professional', 'Ethic/Cultural', 'Fraternity/Sorority', 'Honorary Society', 'Leisure/Recreational', 'Political', 'Religious/Spiritual', 'Service', 'Sports/Leisure', 'Student Affairs'];
// const allInterests = _.pluck(interests, 'type');
const formSchema = new SimpleSchema({
  name: String,
  type: { label: '', type: Array, optional: true },
  'type.$': { type: String, allowedValues: allInterests },
  description: String,
  owner: String,
  ownerMail: String,
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
  const transform = (label) => ` ${label}`;

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
                    <TextField name="image" />
                  </Col>
                  <Row>
                    <Col><TextField name="owner" /></Col>
                    <Col><TextField name="ownerMail" /></Col>
                  </Row>
                </Row>
                <ErrorsField />
                <Row>
                  <Col><h6>Club Type</h6>
                    {/* <SelectField */}
                    {/*  className="selectField mx-auto" */}
                    {/*  name="type" */}
                    {/*  showInlineError */}
                    {/*  help="" */}
                    {/*  multiple */}
                    {/*  checkboxes */}
                    {/*  inline */}
                    {/*  transform={transform} */}
                    {/* /> */}
                    <SelectField
                      className="selectField mx-auto"
                      name="type"
                      showInlineError
                      placeholder="Club Type"
                      multiple
                      transform={transform}
                    />
                  </Col>
                  <Col>
                    <LongTextField name="description" />
                  </Col>
                </Row>
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
