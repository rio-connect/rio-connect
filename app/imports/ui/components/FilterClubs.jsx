import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';

const allInterests = ['Academic/Professional', 'Ethnic/Cultural', 'Fraternity/Sorority', 'Honorary Society', 'Leisure/Recreational', 'Political', 'Religious/Spiritual', 'Service', 'Sports/Leisure', 'Student Affairs'];

const formSchema = new SimpleSchema({
  name: { label: '', type: String, optional: true },
  interests: { label: '', type: Array, optional: true },
  'interests.$': { type: String, allowedValues: allInterests },
});

const FilterClubs = ({ setInterests, setName }) => {
  const formInitialInterests = [];
  const bridge = new SimpleSchema2Bridge(formSchema);
  const transform = (label) => ` ${label}`;
  let formRef = null;
  const submit = (data) => {
    document.getElementById('browseResultsTop').scrollIntoView();
    if (data.name === undefined) {
      setName('' || '');
    } else {
      setName(data.name || '');
    }
    if (data.interests.length === 0) {
      setInterests(allInterests || allInterests);
    } else {
      setInterests(data.interests || allInterests);
    }
  };
  const clearFilters = (fRef) => {
    setName('' || '');
    setInterests(allInterests || allInterests);
    fRef.reset();
  };
  return (
    <Container fluid id="browseSection">
      <h1 className="text-center py-5">Find your club. Get connected.</h1>
      <Container>
        <AutoForm className="mt-4 mx-5" ref={ref => { formRef = ref; }} schema={bridge} onSubmit={data => submit(data)} model={{ formInitialInterests }}>
          <Container id="filterContainer" className="py-3 gray-background">
            <h4>Filter</h4>
            <hr />
            <h5>Club name:</h5>
            <Container id="searchField">
              <TextField name="name" id="searchBar" type="text" className="rounded-left-1 border-0 fs-6 mx-3" placeholder="Filter by club name..." />
            </Container>
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
            <Container>
              <Row>
                <Col> </Col>
                <Col>
                  <SubmitField id="selectInterestsApply" className="text-center my-1" value="Apply" />
                </Col>
                <Col className="d-flex">
                  <Button id="clearFilterBtn" onClick={() => clearFilters(formRef)} variant="link" className="text-black ms-auto my-1">Clear</Button>
                </Col>
              </Row>
            </Container>
          </Container>
        </AutoForm>
      </Container>
    </Container>
  );
};

FilterClubs.propTypes = {
  setInterests: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
};

export default FilterClubs;
