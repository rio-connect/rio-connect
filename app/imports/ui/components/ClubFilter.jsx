import React from 'react';
import { Col, Container, Row, InputGroup, Form, Button } from 'react-bootstrap';
import { AutoForm, SubmitField, SelectField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Search } from 'react-bootstrap-icons';

const InterestsValues = {
  interests: ['Academic/Professional', 'Ethic/Cultural', 'Fraternity/Sorority', 'Honorary Society', 'Leisure/Recreational', 'Political', 'Religious/Spiritual', 'Service', 'Sports/Leisure', 'Student Affairs'],
};

const formSchema = new SimpleSchema({
  interests: { label: '', type: Array, optional: true },
  'interests.$': { type: String, allowedValues: InterestsValues.interests },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const ClubFilter = () => {
  const transform = (label) => ` ${label}`;

  // On submit, insert the data.
  const submit = () => {

  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;

  return (
    <Container>
      <AutoForm className="mt-4 mx-5" ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
        <Row className="mx-0 mb-5  pb-5">
          <Col sm={10} md={8} lg={6} className="mx-auto">
            <InputGroup size="lg">
              <Form.Control id="searchBar" type="text" className="rounded-left-1 border-0 fs-6" placeholder="Search clubs..." />
              <Button id="searchBtn" variant="light" type="button" className="search border-0"><Search /></Button>
            </InputGroup>
          </Col>
        </Row>
        <Container id="filterContainer" className="py-3 gray-background">
          <h3>Filter</h3>
          <hr />
          <h5>Your interests:</h5>
          <Container id="selectInterests" className="px-0">
            <SelectField
              className="selectField mx-auto"
              name="interests"
              showInlineError
              help=""
              multiple
              checkboxes
              inline
              transform={transform}
            />
          </Container>
          <SubmitField className="text-center my-4" value="Apply" />
        </Container>
      </AutoForm>
    </Container>
  );
};

export default ClubFilter;
