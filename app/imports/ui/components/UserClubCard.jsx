import React from 'react';
import PropTypes from 'prop-types';
import { Col, Image, Row, Card, Button } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const UserClubCard = ({ club, onLeaveClub }) => (
  <Card id="user-club-card" className="h-100">
    <Card.Body>
      <Row>
        <Col xs="auto">
          <Image src="/images/generic-club.png" width="100" />
        </Col>
        <Col id="club-card-name">
          <Card.Title id="user-club-card-name">{club.name}</Card.Title>
          <Card.Text>
            {club.description}
            <br />
            <br />
            <Row>
              <Col>
                <a href={`mailto:${club.ownerMail}`}>Contact Club Leadership</a>
              </Col>
              <Col>
                <div className="d-flex justify-content-end">
                  <Button className="btn-danger" onClick={() => onLeaveClub(club)}>Leave Club</Button>
                </div>
              </Col>
            </Row>

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
  onLeaveClub: PropTypes.func.isRequired,
};

export default UserClubCard;
