import React from 'react';
/* import PropTypes from 'prop-types'; */
import { Row, Container, Button, Form } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const UserEditClub = () => (
  <Container className="py-3 gray-background">
    <Container>
      <Row className="justify-content-center ps-2 pe-2">
        <Row className="pb-2">
          Choose club:
        </Row>
        <Row>
          <Form.Select>
            <option>Club 1</option>
            <option>Club 2</option>
            <option>Club 3</option>
            <option>Club 4</option>
          </Form.Select>
        </Row>
      </Row>
      <Row className="justify-content-center pt-3">
        <Button>Edit Club</Button>
      </Row>
    </Container>
  </Container>
);

export default UserEditClub;
