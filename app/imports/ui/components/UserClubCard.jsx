import React from 'react';
/* import PropTypes from 'prop-types'; */
import { Col, Image, Row, Card } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const UserClubCard = () => (
  <Card className="h-100">
    <Card.Body>
      <Row>
        <Col xs="auto">
          <Image src="/images/generic-user.png" width="100" />
        </Col>
        <Col>
          <Card.Title>Club Name</Card.Title>
          <Card.Text>
            This is the description of the club, so that the user has more information on which club this is.
            <p />
            <a href="#">Contact Club Leadership</a>
          </Card.Text>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

/* For eventual use in creating a responsive version.
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
*/

export default UserClubCard;
