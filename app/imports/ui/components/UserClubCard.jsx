import React from 'react';
import PropTypes from 'prop-types';
import { Col, Image, Row, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Defines the appearance of a single ClubCard in the UserClubList.
const UserClubCard = ({ club, onLeaveClub, isAdmin, canEdit }) => (
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
          </Card.Text>
          <Row>
            <a href={`mailto:${club.ownerMail}`}>Contact Club Leadership</a>
          </Row>
          <Row className="pt-3">
            <Col>
              {
                canEdit && (
                  <Link to={`/edit/${club._id}`}>
                    <Button id="edit-club-link">Edit Club</Button>
                  </Link>
                )
              }
            </Col>
            <Col>
              <div className="d-flex justify-content-end">
                {
                  !isAdmin && (
                    <Button className="btn-danger" onClick={() => onLeaveClub(club)} id="leave-club-btn">Leave Club</Button>
                  )
                }
              </div>
            </Col>
          </Row>
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
  isAdmin: PropTypes.bool.isRequired,
  canEdit: PropTypes.bool.isRequired,
};

export default UserClubCard;
