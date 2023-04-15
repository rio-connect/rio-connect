import React from 'react';
/* import PropTypes from 'prop-types'; */
import { Row, Container, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const UserEditClub = ({ clubs }) => (
  <Container className="py-3 gray-background">
    <Container>
      <Row className="justify-content-center ps-2 pe-2">
        <Row className="pb-2">
          Choose club:
        </Row>
        <Row>
          <Form.Select>
            {clubs.map((club => <option>{club.name}</option>))}
          </Form.Select>
        </Row>
      </Row>
      <Row className="justify-content-center pt-3">
        <a href="editclub" className="d-grid gap-2 text-decoration-none text-white">
          <Button variant="primary" size="md">Edit Clubs</Button>
        </a>
      </Row>
    </Container>
  </Container>
);

UserEditClub.propTypes = {
  clubs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  })).isRequired,
};

export default UserEditClub;
