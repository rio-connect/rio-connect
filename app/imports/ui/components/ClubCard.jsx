import React from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/CardHeader';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ClubCard = ({ club }) => (
  <Container className="py-3">
    <Card>
      <CardHeader className="d-flex justify-content-center"><h1>{club.name}</h1></CardHeader>
      <Row>
        <Col>
          <Image src={club.image} className="img-thumbnail m-4 p-4" />
        </Col>
        <Col className="d-flex align-items-center flex-column">
          <Row className="px-4 pt-4">
            <h2> Club Type</h2>
            <p>{club.type}</p>
          </Row>
          <Row className="px-4">
            <h2> Contact Person</h2>
            <p>{club.owner}</p>
          </Row>
          <Row className="px-4">
            <h2> Contact email</h2>
            <p>{club.ownerMail}</p>
          </Row>
        </Col>
      </Row>
      <Row className="px-4">
        <h2>Club Purpose</h2>
        <p>{club.description}</p>
      </Row>
    </Card>
  </Container>
);

ClubCard.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
    ownerMail: PropTypes.string,
    members: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default ClubCard;
