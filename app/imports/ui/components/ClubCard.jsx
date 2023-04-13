import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/CardHeader';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ClubCard = ({ card }) => (
  <Card>
    <CardHeader>Club Name</CardHeader>
    <Row>
      <Col>
        <Image>Club image</Image>
      </Col>
      <Col>
        <div>
          <h2> Club Type</h2>
          <p>Club type</p>
        </div>
        <div>
          <h2> Contact Person</h2>
          <p>contact person</p>
        </div>
        <div>
          <h2> Contact email</h2>
          <p>club email</p>
        </div>
      </Col>
    </Row>
      <Link to={`/edit/${club._id}`}>Edit</Link>
  <Card />
);

// Require a document to be passed to this component.
ClubCard.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    condition: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ClubCard;
