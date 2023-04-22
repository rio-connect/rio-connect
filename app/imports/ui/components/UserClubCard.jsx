import React from 'react';
import PropTypes from 'prop-types';
import { Col, Image, Row, Card } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const UserClubCard = ({ club }) => (
  <Card className="h-100">
    <Card.Body>
      <Row>
        <Col xs="auto">
          <Image src="/images/generic-club.png" width="100" />
        </Col>
        <Col>
          <Card.Title>{club.name}</Card.Title>
          <Card.Text>
            {club.description}
            <br />
            <br />
            <a href={`mailto:${club.ownerMail}`}>Contact Club Leadership</a>
          </Card.Text>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
UserClubCard.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    ownerMail: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default UserClubCard;
